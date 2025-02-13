import { findSessionById, findUserById, signAccessToken } from "@services/auth.service";
import getCookie from "@utils/getCookie";
import type { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken =
		getCookie("access-token", req) ||
		(Array.isArray(req.headers["access-token"]) ? req.headers["access-token"][0] : req.headers["access-token"]);
	const refreshToken =
		getCookie("refresh-token", req) ||
		(Array.isArray(req.headers["refresh-token"]) ? req.headers["refresh-token"][0] : req.headers["refresh-token"]);

	if (!accessToken || !refreshToken) {
		return next();
	}

	const decodedAccess = verifyJwt<{
		id: number;
		email: string;
		createdAt: string;
		updatedAt: string;
		iat: number;
		exp: number;
	}>(accessToken, "accessTokenPublicKey");

	if (decodedAccess) {
		res.locals.user = omit(decodedAccess, "iat", "exp", "password");
		return next();
	}

	const decodedRefesh = verifyJwt<{ session: string }>(refreshToken, "refreshTokenPublicKey");
	if (!decodedRefesh) {
		return next();
	}

	const session = await findSessionById(decodedRefesh.session);

	if (!session || !session.valid) {
		return next();
	}

	let user = null;

	if (!user) {
		user = await findUserById(session.userId);
		if (!user) {
			return next();
		}
	}

	const newAccessToken = signAccessToken(user);

	res.locals.user = omit(user, ["password"]);

	res.cookie("access-token", newAccessToken, {
		maxAge: 2147483647 * 1000,
		httpOnly: true,
		secure: !!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"),
	});

	res.locals.newAccessToken = newAccessToken;

	return next();
};

export default deserializeUser;
