import { Router } from "express";
import { getUsuarios } from "../controllers/user.controller.js";
import { authenticateJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticateJWT, authorizeAdmin, getUsuarios);

export default router;
