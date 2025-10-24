// src/routes/order.routes.ts
import { Router } from "express";
import { PedidoController } from "../controllers/order.controllers.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticateJWT, PedidoController.crearPedido);
router.get("/", authenticateJWT, PedidoController.obtenerPedidos);
router.get("/:id", authenticateJWT, PedidoController.obtenerPedidoPorId);

export default router;
