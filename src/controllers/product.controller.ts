import { Request, Response } from "express";
import { ProductService } from "../services/product.services";

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const product = await ProductService.getById(Number(req.params.id));
      res.json(product);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const product = await ProductService.update(Number(req.params.id), req.body);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await ProductService.delete(Number(req.params.id));
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
}

