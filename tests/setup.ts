import { Sequelize } from 'sequelize-typescript';

// Mock Sequelize to avoid database connections during tests
jest.mock('sequelize-typescript', () => {
  const mockSequelize = {
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(true),
    transaction: jest.fn((callback) => callback({})),
    query: jest.fn().mockResolvedValue([]),
    close: jest.fn().mockResolvedValue(true),
  };
  
  return {
    Sequelize: jest.fn(() => mockSequelize),
    DataType: {
      INTEGER: 'INTEGER',
      STRING: 'STRING',
      DECIMAL: 'DECIMAL',
      TEXT: 'TEXT',
      ENUM: 'ENUM',
      BOOLEAN: 'BOOLEAN',
      DATE: 'DATE'
    },
    QueryTypes: {
      SELECT: 'SELECT',
      INSERT: 'INSERT',
      UPDATE: 'UPDATE',
      DELETE: 'DELETE'
    }
  };
});

// Mock JWT
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
  verify: jest.fn().mockReturnValue({ id: 1, email: 'test@example.com' }),
  decode: jest.fn().mockReturnValue({ id: 1, email: 'test@example.com' })
}));

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true)
}));

// Global test timeout
jest.setTimeout(10000);
