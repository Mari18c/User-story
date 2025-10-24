import { Request, Response } from 'express';

// Mock Request object
export const createMockRequest = (overrides: Partial<Request> = {}): Partial<Request> => ({
  body: {},
  params: {},
  query: {},
  user: { id: 1, email: 'test@example.com' },
  ...overrides
});

// Mock Response object
export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Mock database models
export const createMockModel = (data: any = {}) => ({
  id: 1,
  ...data,
  save: jest.fn().mockResolvedValue({ id: 1, ...data }),
  update: jest.fn().mockResolvedValue({ id: 1, ...data }),
  destroy: jest.fn().mockResolvedValue(true),
  reload: jest.fn().mockResolvedValue({ id: 1, ...data })
});

// Mock Sequelize query result
export const createMockQueryResult = (data: any[] = []) => ({
  rows: data,
  rowCount: data.length
});

// Mock transaction
export const createMockTransaction = () => ({
  commit: jest.fn().mockResolvedValue(true),
  rollback: jest.fn().mockResolvedValue(true),
  LOCK: {
    UPDATE: 'UPDATE'
  }
});

// Test data factories
export const createTestUser = (overrides: any = {}) => ({
  id: 1,
  nombre: 'Test User',
  email: 'test@example.com',
  password: 'hashed-password',
  rol: 'vendedor',
  ...overrides
});

export const createTestCustomer = (overrides: any = {}) => ({
  id: 1,
  nombre: 'Test Customer',
  email: 'customer@example.com',
  telefono: '+1234567890',
  ...overrides
});

export const createTestProduct = (overrides: any = {}) => ({
  id: 1,
  nombre: 'Test Product',
  descripcion: 'Test Description',
  precio: 99.99,
  stock: 100,
  codigo: 'TEST001',
  ...overrides
});

export const createTestOrder = (overrides: any = {}) => ({
  id: 1,
  cliente_id: 1,
  usuario_id: 1,
  total: 199.98,
  estado: 'pendiente',
  fecha: new Date('2024-01-15T10:30:00.000Z'),
  ...overrides
});

export const createTestOrderDetail = (overrides: any = {}) => ({
  id: 1,
  pedido_id: 1,
  producto_id: 1,
  cantidad: 2,
  precio_unitario: 99.99,
  subtotal: 199.98,
  ...overrides
});

