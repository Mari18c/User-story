import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Usuario } from "../models/user.model";
import { Cliente } from "../models/client.model";
import { Producto } from "../models/product.model";
import { Pedido } from "../models/order.model";
import { DetallePedido } from "../models/order_details.models";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  models: [Usuario, Cliente, Producto, Pedido, DetallePedido],
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sincroniza modelos con tablas existentes
    console.log(" Conectado y modelos sincronizados correctamente");
  } catch (error) {
    console.error("Error al conectar o sincronizar:", error);
  }
};
