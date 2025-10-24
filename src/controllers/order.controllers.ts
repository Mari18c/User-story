// src/controllers/order.controller.ts
import { Request, Response } from "express";
import { PedidoService } from "../services/order.services.js";

export class PedidoController {
  // POST /api/pedidos
  static async crearPedido(req: Request, res: Response) {
    try {
      // intentar tomar usuario desde req.user (middleware authenticateJWT)
      // @ts-ignore
      const authUser = req.user;
      const usuario_id = authUser?.id ?? req.body.usuario_id;

      if (!usuario_id) {
        // si tu modelo exige usuario_id, y no hay middleware, fallo
        // si tu modelo permite null, puedes quitar esta validación
        return res.status(400).json({ message: "usuario_id requerido (o autenticar el usuario)" });
      }

      const payload = {
        cliente_id: Number(req.body.cliente_id),
        usuario_id: Number(usuario_id),
        detalles: req.body.detalles,
      };

      const pedido = await PedidoService.crearPedido(payload);
      res.status(201).json(pedido);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async obtenerPedidos(req: Request, res: Response) {
    try {
      const { cliente_id, producto_id } = req.query;
      
      const filtros: { cliente_id?: number; producto_id?: number } = {};
      
      if (cliente_id) {
        filtros.cliente_id = Number(cliente_id);
      }
      
      if (producto_id) {
        filtros.producto_id = Number(producto_id);
      }
      
      const pedidos = await PedidoService.obtenerPedidos(filtros);
      res.json({
        success: true,
        data: pedidos,
        total: pedidos.length,
        filtros: filtros
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async obtenerPedidoPorId(req: Request, res: Response) {
    try {
      const pedido = await PedidoService.obtenerPedidoPorId(Number(req.params.id));
      res.json({
        success: true,
        data: pedido
      });
    } catch (err: any) {
      res.status(404).json({ 
        success: false,
        message: err.message 
      });
    }
  }
}
