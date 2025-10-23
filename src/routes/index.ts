import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// Conectar routers importados
router.use("/auth", authRoutes);
router.use("/usuarios", userRoutes);

export default router;
