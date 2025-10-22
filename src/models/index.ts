import { sequelize } from '../config/db';
import { UsuarioModel } from './user.model';
// 🔹 Importa aquí tus otros modelos cuando los tengas, por ejemplo:
// import { ProductoModel } from './producto.model';
// import { PedidoModel } from './pedido.model';

export const initModels = async () => {
  // 🔹 Inicializa los modelos con la instancia de sequelize
  const Usuario = UsuarioModel(sequelize);
  // const Producto = ProductoModel(sequelize);
  // const Pedido = PedidoModel(sequelize);

  // 🔹 Aquí defines relaciones si las necesitas:
  // Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
  // Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

  await sequelize.sync({ alter: true }); // 🔹 Crea o actualiza las tablas
  console.log(' Modelos sincronizados correctamente');

  return { Usuario /*, Producto, Pedido */ };
};
