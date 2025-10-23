// src/models/user.model.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; // Asegúrate de que aquí exportes tu conexión a Supabase

export const Usuario = sequelize.define("usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user"
  }
}, {
  tableName: "usuario",  
  timestamps: false       
});
