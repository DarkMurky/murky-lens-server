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
import requireUser from "@middleware/requireUser";

const router = Router();
const BASE_PATH = "/api/lenses";

router.get(BASE_PATH, requireUser, getAllLensHandler);

router.get(
	`${BASE_PATH}/:id`,
	(req, _, next) => {
		validateGetLens(req, zodGetLenseSchema);
		next();
	},
	getLensHandler,
);

router.put(
	`${BASE_PATH}/:id`,
	requireUser,
	(req, _, next) => {
		validateUpdateLens(req, zodUpdateLenseSchema);
		next();
	},
	updateLensHandler,
);

router.post(
	BASE_PATH,
	requireUser,
	(req, _, next) => {
		validateCreateLens(req, zodCreateLenseSchema);
		next();
	},
	createLensHandler,
);

router.delete(
	`${BASE_PATH}/:id`,
	requireUser,
	(req, _, next) => {
		validateDeleteLens(req, zodDeleteLenseSchema);
		next();
	},
	deleteLensHandler,
);

export default router;
