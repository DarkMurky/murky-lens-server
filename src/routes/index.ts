import { Router } from "express";

import lensRouter from "@routes/lens.routes";

const router = Router();

router.use(lensRouter);

export default router;
