import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "producto",
  timestamps: false,  
})
export class Producto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare descripcion?: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare precio: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare stock: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare codigo: string;
}
