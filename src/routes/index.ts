import { Router } from "express";

import authRouter from "@routes/auth.routes";
import lensRouter from "@routes/lens.routes";
import userRouter from "@routes/user.routes";

const router = Router();

router.use(lensRouter);
router.use(userRouter);
router.use(authRouter);

export default router;
