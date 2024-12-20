import type { Request, RequestHandler, Response } from "express";

import { createLens, deleteLense, getAllLenses, getLense, updateLens } from "@services/lens.service";

export const createLensHandler: RequestHandler = async (req: Request, res: Response) => {
	await createLens({
		name: req.body.name,
		desc: req.body.desc,
		iconUrl: req.body.iconUrl,
		location: req.body.location,
	});

	res.status(200).json({ success: true, message: "New lens created" });
};

export const getAllLensHandler: RequestHandler = async (req: Request, res: Response) => {
	const lenses = await getAllLenses();

	res.status(200).json({ success: true, message: "Fetched all lenses", payload: lenses });
};

export const getLensHandler: RequestHandler = async (req: Request, res: Response) => {
	const lense = await getLense(req.params.id);

	if (lense) {
		res.status(200).json({ success: true, payload: lense });
	} else {
		res.status(404).json({
			success: false,
			message: `Lens with id of ${req.params.id} does not exist`,
		});
	}
};

export const updateLensHandler: RequestHandler = async (req: Request, res: Response) => {
	const updatedLense = await updateLens(
		{
			name: req.body.name,
			desc: req.body.desc,
			iconUrl: req.body.iconUrl,
			location: req.body.location,
		},
		req.params.id,
	);

	res.status(200).json({ success: true, message: "Lens updated", payload: updatedLense });
};

export const deleteLensHandler: RequestHandler = async (req: Request, res: Response) => {
	const deletedLense = await deleteLense(req.params.id);

	res.status(200).json({ success: true, message: "Lens deleted", payload: deletedLense });
};
