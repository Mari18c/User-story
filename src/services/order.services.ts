// src/services/order.service.ts
import { Sequelize, QueryTypes } from "sequelize";
import { Pedido } from "../models/order.model";
import { DetallePedido } from "../models/order_details.models";
import { Producto } from "../models/product.model";
import { Cliente } from "../models/client.model";

interface DetallePedidoDTO {
  producto_id: number;
  cantidad: number;
}

interface PedidoDTO {
  cliente_id: number;
  usuario_id?: number; // opcional — controller intentará tomar de req.user
  detalles: DetallePedidoDTO[];
}

export class PedidoService {
  static async crearPedido(data: PedidoDTO) {
    const { cliente_id, usuario_id, detalles } = data;

    // validar cliente
    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) throw new Error("Cliente no encontrado");

    if (!detalles || detalles.length === 0) {
      throw new Error("Debe incluir al menos un producto en el pedido");
    }

    const sequelize = (Pedido as any).sequelize as Sequelize;
    if (!sequelize) throw new Error("No hay instancia de sequelize disponible");

    // Usamos transacción para que todo sea atómico
    return await sequelize.transaction(async (tx) => {
      // validar stock y calcular total (además reservamos la lógica dentro de tx)
      let total = 0;
      // cargamos productos con FOR...of secuencialmente para checks y evitar race conditions en stock
      for (const item of detalles) {
        const producto = await Producto.findByPk(item.producto_id, { transaction: tx, lock: tx.LOCK.UPDATE });
        if (!producto) throw new Error(`Producto con ID ${item.producto_id} no existe`);
        
        
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto con ID ${item.producto_id}. Stock disponible: ${producto.stock}, solicitado: ${item.cantidad}`);
        }
        // Validar que el precio existe y es válido
        if (!producto.precio || producto.precio <= 0) {
          throw new Error(`El producto con ID ${item.producto_id} no tiene un precio válido. Precio actual: ${producto.precio}`);
        }
        total += Number(producto.precio) * item.cantidad;
      }

      // crear pedido principal
      const pedido = await Pedido.create({
        cliente_id,
        usuario_id: usuario_id ?? null,
        total,
        estado: "pendiente",
      } as any, { transaction: tx });

      // crear detalles y reducir inventario
      for (const item of detalles) {
        const producto = await Producto.findByPk(item.producto_id, { transaction: tx, lock: tx.LOCK.UPDATE });
        if (!producto) throw new Error(`Producto con ID ${item.producto_id} no existe (segunda ver)`);
        
        // Validar que el precio existe y es válido
        if (!producto.precio || producto.precio <= 0) {
          throw new Error(`El producto con ID ${item.producto_id} no tiene un precio válido`);
        }

        const precio_unitario = Number(producto.precio);

        // Usar consulta SQL directa para evitar problemas con campos calculados
        await sequelize.query(
          `INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario) 
           VALUES (?, ?, ?, ?)`,
          {
            replacements: [pedido.id, producto.id, item.cantidad, precio_unitario],
            transaction: tx,
            type: QueryTypes.INSERT
          }
        );

        // reducir stock (usamos update o decrement dentro de la transacción)
        await producto.update({ stock: producto.stock - item.cantidad }, { transaction: tx });
      }

      // opcional: carga y retorna el pedido con detalles
      const pedidoConDetalles = await Pedido.findByPk(pedido.id, {
        include: [{ model: DetallePedido }],
        transaction: tx,
      });

      return pedidoConDetalles ?? pedido;
    });
  }

  static async obtenerPedidos() {
    return await Pedido.findAll({ include: [{ model: DetallePedido }, { model: Cliente }] });
  }

  static async obtenerPedidoPorId(id: number) {
    const pedido = await Pedido.findByPk(id, { include: [{ model: DetallePedido }, { model: Cliente }] });
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
  }
}
