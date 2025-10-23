import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Unique,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "Usuarios",
  timestamps: true,
  createdAt: "createdAt"
})
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Default("vendedor")
  @Column({ type: DataType.ENUM("admin", "vendedor"), allowNull: false })
  declare rol: "admin" | "vendedor";
}
