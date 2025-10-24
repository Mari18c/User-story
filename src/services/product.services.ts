import { Producto } from "../models/product.model.js";

interface ProductDTO {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  codigo: string;
}

export class ProductService {
  static async create(data: ProductDTO) {
    // Validar código único
    const existing = await Producto.findOne({ where: { codigo: data.codigo } });
    if (existing) throw new Error("El código ya está registrado");

    const product = await Producto.create(data as any);
    return product;
  }

  static async getAll() {
    return await Producto.findAll();
  }

  static async getById(id: number) {
    const product = await Producto.findByPk(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  static async update(id: number, data: Partial<ProductDTO>) {
    const product = await Producto.findByPk(id);
    if (!product) throw new Error("Producto no encontrado");

    if (data.codigo && data.codigo !== product.codigo) {
      const existing = await Producto.findOne({ where: { codigo: data.codigo } });
      if (existing) throw new Error("El código ya está registrado");
    }

    await product.update(data);
    return product;
  }

  static async delete(id: number) {
    const product = await Producto.findByPk(id);
    if (!product) throw new Error("Producto no encontrado");
    await product.destroy();
    return { message: "Producto eliminado" };
  }
}
