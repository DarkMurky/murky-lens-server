import { getCurrentSession, getCurrentUserHandler } from "@controllers/user.controller";
import requireUser from "@middleware/requireUser";
import express from "express";

const router = express.Router();
const BASE_PATH = "/api/user";

router.get(`${BASE_PATH}/check`, requireUser, getCurrentSession);
router.get(`${BASE_PATH}/me`, requireUser, getCurrentUserHandler);

export default router;
