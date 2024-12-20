import { Router } from "express";

import {
	createLensHandler,
	deleteLensHandler,
	getAllLensHandler,
	getLensHandler,
	updateLensHandler,
} from "@controllers/lens.controller";

import { validateCreateLens, validateDeleteLens, validateGetLens, validateUpdateLens } from "@utils/validateRequest";

import {
	zodCreateLenseSchema,
	zodDeleteLenseSchema,
	zodGetLenseSchema,
	zodUpdateLenseSchema,
} from "@constants/zodSchema";

const router = Router();

router.get("/lenses", getAllLensHandler);

router.get(
	"/lenses/:id",
	(req, _, next) => {
		validateGetLens(req, zodGetLenseSchema);
		next();
	},
	getLensHandler,
);

router.put(
	"/lenses/:id",
	(req, _, next) => {
		validateUpdateLens(req, zodUpdateLenseSchema);
		next();
	},
	updateLensHandler,
);

router.post(
	"/lenses",
	(req, _, next) => {
		validateCreateLens(req, zodCreateLenseSchema);
		next();
	},
	createLensHandler,
);

router.post(
	"/lenses",
	(req, _, next) => {
		validateCreateLens(req, zodCreateLenseSchema);
		next();
	},
	createLensHandler,
);

router.delete(
	"/lenses/:id",
	(req, _, next) => {
		validateDeleteLens(req, zodDeleteLenseSchema);
		next();
	},
	deleteLensHandler,
);

export default router;
