import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const DetallePedido = sequelize.define("DetallePedido", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pedido_id: { type: DataTypes.INTEGER, allowNull: false },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      return (this.getDataValue("cantidad") ?? 0) * (this.getDataValue("precio_unitario") ?? 0);
    }
  }
});
