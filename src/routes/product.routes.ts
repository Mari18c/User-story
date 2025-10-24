import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authenticateJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo admins pueden crear, actualizar y eliminar
router.post("/", authenticateJWT, authorizeAdmin, ProductController.create);
router.get("/", authenticateJWT, ProductController.getAll);
router.get("/:id", authenticateJWT, ProductController.getById);
router.put("/:id", authenticateJWT, authorizeAdmin, ProductController.update);
router.delete("/:id", authenticateJWT, authorizeAdmin, ProductController.delete);

export default router;
 