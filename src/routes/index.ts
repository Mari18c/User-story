import { Router } from 'express';

const router = Router();

// Rutas de prueba básicas (puedes agregar más luego)
router.get('/test', (req, res) => {
  res.json({ message: 'Ruta /api/test funcionando correctamente 🚀' });
});

export default router;
