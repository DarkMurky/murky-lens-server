import type { Prisma } from "@prisma/client";
import { createSession, createUser, findUserByEmail, signAccessToken, signRefreshToken } from "@services/auth.service";
import hashPassword from "@utils/hashPassword";
import { validatePassword } from "@utils/validatePassword";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { omit } from "lodash";

export const createUserHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { password, email } = req.body;

	const userAlreadyExists: Prisma.UserUncheckedCreateInput | null = await findUserByEmail(email);

	try {
		if (userAlreadyExists){
			const error = createError(403, JSON.stringify("User already exists"));
			error.isOperational = true;
			throw error;
		}
	} catch (error) {
		return next(error)
	}

	const hashedPassword = await hashPassword(password);

	await createUser({ email, password: hashedPassword });

	res.status(200).json({ success: true, message: "User registered" });
};

export const createSessionHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const message = "Wrong email or password";

	const user: Prisma.UserUncheckedCreateInput | null = await findUserByEmail(email);

	try {
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
	
	} catch (error) {
		return next(error)
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

export const logoutSessionHandler: RequestHandler = async (req: Request, res: Response) => {
	res.locals.user = null;

	res.clearCookie("access-token").clearCookie("refresh-token").status(200).json({
		success: true,
		message: "User logged out",
	});
};
