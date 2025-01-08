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
const BASE_PATH = "/api/lenses";

router.get(BASE_PATH, getAllLensHandler);

router.get(
	`${BASE_PATH}/:id`, // Use the constant here
	(req, _, next) => {
		validateGetLens(req, zodGetLenseSchema);
		next();
	},
	getLensHandler,
);

router.put(
	`${BASE_PATH}/:id`, // Use the constant here
	(req, _, next) => {
		validateUpdateLens(req, zodUpdateLenseSchema);
		next();
	},
	updateLensHandler,
);

router.post(
	BASE_PATH, // Use the constant here
	(req, _, next) => {
		validateCreateLens(req, zodCreateLenseSchema);
		next();
	},
	createLensHandler,
);

router.delete(
	`${BASE_PATH}/:id`, // Use the constant here
	(req, _, next) => {
		validateDeleteLens(req, zodDeleteLenseSchema);
		next();
	},
	deleteLensHandler,
);

export default router;
