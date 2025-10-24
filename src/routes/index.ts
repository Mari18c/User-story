// src/routes/index.ts (ejemplo)
import { Router } from "express";
import orderRoutes from "./order.routes.js";
import clientRoutes from "./client.routes.js";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
// ...

const router = Router();

router.use("/auth", authRoutes);
router.use("/clientes", clientRoutes);
router.use("/productos", productRoutes);
router.use("/pedidos", orderRoutes);

export default router;
