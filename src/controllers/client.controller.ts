import { Request, Response } from "express";
import { ClienteService } from "../services/client.services";

export class ClienteController {
  static async getAll(req: Request, res: Response) {
    try {
      const clientes = await ClienteService.getAll();
      res.json(clientes);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const cliente = await ClienteService.getById(Number(req.params.id));
      res.json(cliente);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const cliente = await ClienteService.create(req.body);
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const cliente = await ClienteService.update(Number(req.params.id), req.body);
      res.json(cliente);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await ClienteService.delete(Number(req.params.id));
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
