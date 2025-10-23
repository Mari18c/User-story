import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Rutas de clientes funcionando 🧩" });
});

export default router;
