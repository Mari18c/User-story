import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey } from "sequelize-typescript";
import { Pedido } from "./order.model";
import { Producto } from "./product.model";

@Table({
  tableName: "detalle_pedido",
  timestamps: false,
})
export class DetallePedido extends Model<DetallePedido> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Pedido)
  @Column({ type: DataType.INTEGER, allowNull: false })
  pedido_id!: number;

  @ForeignKey(() => Producto)
  @Column({ type: DataType.INTEGER, allowNull: false })
  producto_id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  cantidad!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  precio_unitario!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    get() {
      return Number(this.getDataValue("cantidad")) * Number(this.getDataValue("precio_unitario"));
    },
  })
  subtotal!: number;
}
