import { DataTypes, Sequelize } from 'sequelize';

const ClienteModel = (sequelize: Sequelize) => {
  return sequelize.define('cliente', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'cliente',
    timestamps: false,
  });
};

export default ClienteModel;
