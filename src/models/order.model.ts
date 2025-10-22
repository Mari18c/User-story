import { DataTypes, Sequelize } from 'sequelize';

const PedidoModel = (sequelize: Sequelize) => {
  return sequelize.define('pedido', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id',
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
      defaultValue: 'pendiente',
    },
  }, {
    tableName: 'pedido',
    timestamps: false,
  });
};

export default PedidoModel;
