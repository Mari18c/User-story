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
  // --- REGISTER ---
  static async register({ nombre, email, password, rol }: RegisterDTO) {
    if (!nombre || !email || !password) {
      throw new Error("Nombre, email y contraseña son requeridos");
    }

    const existing = await Usuario.findOne({ where: { email } });
    if (existing) throw new Error("El correo ya está registrado");

    const hashed = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      nombre,
      email,
      password: hashed,
      rol: rol || "vendedor",
    } as any);

    return user;
  }

  // --- LOGIN ---
  static async login({ email, password }: LoginDTO) {
    if (!email || !password) throw new Error("Email y contraseña son requeridos");

    const user = await Usuario.findOne({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    // Depuración para evitar el error "data and hash arguments required"
    if (!user.password) throw new Error("Contraseña no encontrada en el usuario");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "40m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  // --- REFRESH TOKEN ---
  static async refreshToken(token: string) {
    if (!token) throw new Error("Refresh token requerido");

    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;

      const user = await Usuario.findByPk(payload.id);
      if (!user) throw new Error("Usuario no encontrado");

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET!,
        { expiresIn: "40m" }
      );

      return { accessToken };
    } catch (err) {
      throw new Error("Refresh token inválido o expirado");
    }
  }
}
