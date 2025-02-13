import type { Prisma } from "@prisma/client";
import { createSession, createUser, findUserByEmail, signAccessToken, signRefreshToken } from "@services/auth.service";
import hashPassword from "@utils/hashPassword";
import { validatePassword } from "@utils/validatePassword";
import type { Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { omit } from "lodash";

export const createUserHandler: RequestHandler = async (req, res) => {
	const { password, ...body } = req.body;

	const hashedPassword = await hashPassword(password);

	// Not checking if the user exists because there is already a property in the model that states the username must be unique, which we have also handled in the global error handler
	await createUser({ ...body, password: hashedPassword });

	res.status(200).json({ success: true, message: "User registered" });
};

export const createSessionHandler: RequestHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const message = "Wrong email or password";

	const user: Prisma.UserUncheckedCreateInput | null = await findUserByEmail(email);

	if (!user) {
		const error = createError(404, JSON.stringify(message));
		error.isOperational = true;
		throw error;
	}

	const isValid = await validatePassword(user.password, password);

	if (!isValid) {
		const error = createError(401, JSON.stringify(message));
		error.isOperational = true;
		throw error;
	}

	const session = await createSession(user);

	const accessToken = await signAccessToken(user);

	const refreshToken = await signRefreshToken(session.id);

	res
		.cookie("refresh-token", refreshToken, {
			maxAge: 2147483647 * 1000,
			httpOnly: true,
			secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
		})
		.cookie("access-token", accessToken, {
			maxAge: 2147483647 * 1000,
			httpOnly: true,
			secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
		});

	const userWithoutPassword = omit(user, ["password"]);
	res.status(200).json({
		success: true,
		message: "Logged in",
		payload: {
			user: userWithoutPassword,
			"refresh-token": refreshToken,
			"access-token": accessToken,
		},
	});
};

export const logoutSessionHandler: RequestHandler = async (req, res) => {
	res.locals.user = null;

	res.clearCookie("access-token").clearCookie("refresh-token").status(200).json({
		success: true,
		message: "User logged out",
	});
};
