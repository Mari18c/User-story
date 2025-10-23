import { Request, Response } from "express";
import { Usuario } from "../models/user.model.js";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
