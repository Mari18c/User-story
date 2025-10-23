import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Unique } from "sequelize-typescript";

@Table({
  tableName: "producto",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Producto extends Model<Producto> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nombre!: string;

  @Column({ type: DataType.TEXT })
  descripcion!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  precio!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  stock!: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  codigo!: string;
}
