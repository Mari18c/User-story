import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Pedido = sequelize.define("Pedido", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  estado: {
    type: DataTypes.ENUM("pendiente", "pagado", "cancelado"),
    defaultValue: "pendiente"
  }
});
