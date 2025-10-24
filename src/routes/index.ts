import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import clientRoutes from "./client.routes.js"; 
const router = Router();

// Agrupamos todas las rutas bajo /api
router.use("/auth", authRoutes);
router.use("/usuarios", userRoutes);
router.use("/productos", productRoutes);
router.use("/clientes", clientRoutes); 

export default router;
