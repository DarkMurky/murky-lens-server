import { createSessionHandler, createUserHandler, logoutSessionHandler } from "@controllers/auth.controller";
import express from "express";
import requireUser from "../middleware/requireUser";

const router = express.Router();
const BASE_PATH = "/api/auth";

router.post(`${BASE_PATH}/register`, createUserHandler);

router.post(`${BASE_PATH}/login`, createSessionHandler);

router.get(`${BASE_PATH}/logout`, requireUser, logoutSessionHandler);

export default router;
