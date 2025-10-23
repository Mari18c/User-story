import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  codigo: { type: DataTypes.STRING(50), unique: true, allowNull: false }
});
