import { sequelize } from "../config/db.js";
import { Usuario } from "./user.model.js";
import { Producto } from "./product.model.js";
import { Pedido } from "./order.model.js";
import { DetallePedido } from "./order_details.models.js";
import { Cliente } from "./client.model.js";

export const initModels = async () => {
  Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
  Pedido.belongsTo(Usuario, { foreignKey: "usuario_id" });
  DetallePedido.belongsTo(Pedido, { foreignKey: "pedido_id" });
  DetallePedido.belongsTo(Producto, { foreignKey: "producto_id" });

  await sequelize.sync({ alter: true });
  console.log(" Modelos sincronizados correctamente");
};

export { Usuario, Producto, Pedido, DetallePedido, Cliente };
