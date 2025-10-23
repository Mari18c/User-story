import { Router } from "express";
const router = Router();

// Ruta de prueba temporal
router.get("/", (req, res) => {
  res.json({ message: "Rutas de productos funcionando " });
});

export default router;
