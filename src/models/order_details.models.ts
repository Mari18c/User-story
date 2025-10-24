import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey } from "sequelize-typescript";
import { Pedido } from "./order.model";
import { Producto } from "./product.model";

@Table({
  tableName: "detalle_pedido",
  timestamps: false,
})
export class DetallePedido extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Pedido)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare pedido_id: number;

  @ForeignKey(() => Producto)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare producto_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cantidad: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare precio_unitario: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: true,
  })
  declare subtotal: number;
}
