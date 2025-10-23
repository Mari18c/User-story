import { Usuario } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterDTO {
  nombre: string;
  email: string;
  password: string;
  rol?: "admin" | "vendedor";
}

interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  static async register({ nombre, email, password, rol }: RegisterDTO) {
    const existing = await Usuario.findOne({ where: { email } });
    if (existing) throw new Error("El correo ya está registrado");

    const hashed = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ nombre, email, password: hashed, rol });
    return user;
  }

  static async login({ email, password }: LoginDTO) {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return token;
  }
}
