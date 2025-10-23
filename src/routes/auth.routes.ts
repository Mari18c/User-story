import { Router } from "express";
import { AuthService } from "../services/auth.services.js";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("pepe");
    
    const tokens = await AuthService.login(req.body);
    res.json(tokens);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Refresh Token
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Refresh token requerido");

    const newAccessToken = await AuthService.refreshToken(refreshToken);
    res.json(newAccessToken);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default router;
