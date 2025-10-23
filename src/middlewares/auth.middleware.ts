import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user = payload; // agregamos info del usuario al request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ message: "No autorizado" });
  if (req.user.rol !== "admin") return res.status(403).json({ message: "Acceso denegado" });
  next();
};
