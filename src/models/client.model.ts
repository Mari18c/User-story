import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cliente = sequelize.define("Cliente", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100) },
  telefono: { type: DataTypes.STRING(20) }
});
