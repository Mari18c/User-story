import { Cliente } from "../models/client.model";

export class ClienteService {
  static async getAll() {
    return await Cliente.findAll();
  }

  static async getById(id: number) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error("Cliente no encontrado");
    return cliente;
  }

  static async create(data: { nombre: string; email?: string; telefono?: string }) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    return await Cliente.create(data as any);
  }

  static async update(id: number, data: any) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error("Cliente no encontrado");
    await cliente.update(data);
    return cliente;
  }

  static async delete(id: number) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error("Cliente no encontrado");
    await cliente.destroy();
    return { message: "Cliente eliminado correctamente" };
  }
}
