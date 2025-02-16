import { createSessionHandler, createUserHandler, logoutSessionHandler } from "@controllers/auth.controller";
import express from "express";
import requireUser from "../middleware/requireUser";
import { validateLogin, validateRegister } from "@utils/validateRequest";
import { zodLoginSchema, zodRegisterSchema } from "@constants/zodSchema";

const router = express.Router();
const BASE_PATH = "/api/auth";

router.post(`${BASE_PATH}/register`, (req, _, next) => {
    validateRegister(req, zodRegisterSchema);
    next();
}, createUserHandler);

router.post(`${BASE_PATH}/login`, (req, _, next) => {
    validateLogin(req, zodLoginSchema);
    next();
}, createSessionHandler);

router.get(`${BASE_PATH}/logout`, requireUser, logoutSessionHandler);

export default router;
