import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, Default } from "sequelize-typescript";
import { Cliente } from "./client.model";
import { Usuario } from "./user.model.js";

@Table({
  tableName: "pedido",
  timestamps: true,
  createdAt: "fecha",
  updatedAt: false,
})
export class Pedido extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Cliente)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cliente_id: number;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER })
  declare usuario_id: number;

  @Default("pendiente")
  @Column({ type: DataType.ENUM("pendiente", "pagado", "cancelado") })
  declare estado: string;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  declare total: number;
}