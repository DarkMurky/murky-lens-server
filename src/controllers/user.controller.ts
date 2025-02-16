import type { Request, RequestHandler, Response } from "express";

export const getCurrentSession: RequestHandler = async (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "Your user is authenticated",
		payload: { authenticated: true, "access-token": res.locals.newAccessToken },
	});
};

export const getCurrentUserHandler: RequestHandler = async (req, res) => {
	res.json({ success: true, payload: { user: res.locals.user } });
};
