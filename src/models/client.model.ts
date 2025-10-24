import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from "sequelize-typescript";

@Table({
  tableName: "cliente",
  timestamps: false,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Cliente extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare telefono: string;
}
