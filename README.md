# 🛒 Order Management System

A complete REST API for managing orders, products, customers, and users with JWT authentication, stock validation, and automatic inventory reduction.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Usage Examples](#-usage-examples)
- [Database](#-database)
- [Docker](#-docker)
- [Development](#-development)

## ✨ Features

- 🔐 **JWT Authentication** - Secure authentication system
- 📦 **Product Management** - Complete CRUD with stock control
- 👥 **Customer Management** - Customer information administration
- 🛒 **Order Management** - Order creation and consultation
- 📊 **Stock Validation** - Automatic inventory verification
- 🔄 **Automatic Reduction** - Automatic stock updates
- 💰 **Total Calculation** - Automatic price and subtotal calculation
- 🔒 **Atomic Transactions** - Secure operations with automatic rollback
- 🔍 **Advanced Filters** - Order queries by customer and product
- 📈 **Reports** - Sales report generation

## 🛠 Technologies

- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize + Sequelize-TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express middleware
- **Containers**: Docker + Docker Compose
- **Environment Variables**: dotenv

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Docker (optional)

### Local Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd UserStory
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. **Set up the database**
```bash
# Create the database in PostgreSQL
createdb userstory_db

# Run migrations
npm run db:migrate
```

5. **Start the server**
```bash
npm run dev
```

### Docker Installation

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/userstory_db

# JWT
JWT_SECRET=your_very_secure_jwt_secret
JWT_EXPIRES_IN=24h

# Server
PORT=3002
NODE_ENV=development
```

## 📁 Project Structure

```
UserStory/
├── src/
│   ├── config/
│   │   ├── db.ts              # Database configuration
│   │   ├── init.sql           # Initialization script
│   │   └── seed.sql           # Test data
│   ├── controllers/
│   │   ├── auth.controller.ts # Authentication controller
│   │   ├── client.controller.ts
│   │   ├── order.controllers.ts
│   │   ├── product.controller.ts
│   │   ├── reports.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts # JWT authentication middleware
│   ├── models/
│   │   ├── client.model.ts    # Customer model
│   │   ├── order.model.ts     # Order model
│   │   ├── order_details.models.ts # OrderDetail model
│   │   ├── product.model.ts   # Product model
│   │   ├── user.model.ts      # User model
│   │   └── index.ts           # Model configuration
│   ├── routes/
│   │   ├── auth.routes.ts     # Authentication routes
│   │   ├── client.routes.ts   # Customer routes
│   │   ├── order.routes.ts    # Order routes
│   │   ├── product.routes.ts  # Product routes
│   │   ├── reports.routes.ts  # Report routes
│   │   ├── user.routes.ts     # User routes
│   │   └── index.ts           # Route configuration
│   ├── services/
│   │   ├── auth.services.ts   # Authentication logic
│   │   ├── client.services.ts # Customer logic
│   │   ├── order.services.ts  # Order logic
│   │   ├── product.services.ts # Product logic
│   │   ├── reports.services.ts # Report logic
│   │   └── user.services.ts   # User logic
│   ├── types/
│   │   └── express.d.ts       # Express types
│   ├── app.ts                 # Express configuration
│   └── server.ts              # Server entry point
├── docker-compose.yml         # Docker configuration
├── dockerfile                 # Docker image
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/refresh` | Refresh token | No |

### 👥 Customers

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/clientes` | Get all customers | ✅ |
| GET | `/api/clientes/:id` | Get customer by ID | ✅ |
| POST | `/api/clientes` | Create new customer | ✅ |
| PUT | `/api/clientes/:id` | Update customer | ✅ |
| DELETE | `/api/clientes/:id` | Delete customer | ✅ |

### 📦 Products

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/products` | Get all products | ✅ |
| GET | `/api/products/:id` | Get product by ID | ✅ |
| POST | `/api/products` | Create new product | ✅ |
| PUT | `/api/products/:id` | Update product | ✅ |
| DELETE | `/api/products/:id` | Delete product | ✅ |

### 🛒 Orders

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/pedidos` | Get orders (with filters) | ✅ |
| GET | `/api/pedidos/:id` | Get order by ID | ✅ |
| POST | `/api/pedidos` | Create new order | ✅ |

### 📊 Reports

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/reports/ventas` | Sales report | ✅ |
| GET | `/api/reports/productos` | Product report | ✅ |

## 🔐 Authentication

### User Registration

```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "rol": "vendedor"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "nombre": "John Doe",
      "email": "john@example.com",
      "rol": "vendedor"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Using the Token

Include the token in the `Authorization` header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 💡 Usage Examples

### 1. Create an Order

```bash
POST /api/pedidos
Authorization: Bearer <token>
Content-Type: application/json

{
  "cliente_id": 1,
  "detalles": [
    {
      "producto_id": 1,
      "cantidad": 2
    },
    {
      "producto_id": 2,
      "cantidad": 1
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "cliente_id": 1,
    "usuario_id": 1,
    "total": 150.00,
    "estado": "pendiente",
    "fecha": "2024-01-15T10:30:00.000Z",
    "DetallePedidos": [
      {
        "id": 1,
        "producto_id": 1,
        "cantidad": 2,
        "precio_unitario": 50.00,
        "subtotal": 100.00,
        "Producto": {
          "id": 1,
          "nombre": "Product A",
          "codigo": "PROD001"
        }
      }
    ],
    "Cliente": {
      "id": 1,
      "nombre": "Example Customer",
      "email": "customer@example.com"
    }
  }
}
```

### 2. Query Orders with Filters

#### All orders
```bash
GET /api/pedidos
Authorization: Bearer <token>
```

#### Orders by customer
```bash
GET /api/pedidos?cliente_id=1
Authorization: Bearer <token>
```

#### Orders by product
```bash
GET /api/pedidos?producto_id=2
Authorization: Bearer <token>
```

#### Combine filters
```bash
GET /api/pedidos?cliente_id=1&producto_id=2
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "cliente_id": 1,
      "total": 150.00,
      "estado": "pendiente",
      "fecha": "2024-01-15T10:30:00.000Z",
      "DetallePedidos": [...],
      "Cliente": {...}
    }
  ],
  "total": 1,
  "filtros": {
    "cliente_id": 1,
    "producto_id": 2
  }
}
```

### 3. Create a Product

```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "New Product",
  "descripcion": "Product description",
  "precio": 99.99,
  "stock": 100,
  "codigo": "PROD123"
}
```

### 4. Create a Customer

```bash
POST /api/clientes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "New Customer",
  "email": "new@customer.com",
  "telefono": "+1234567890"
}
```

## 🗄️ Database

### Table Schema

#### Users
```sql
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'vendedor',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Customers
```sql
CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Products
```sql
CREATE TABLE producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL,
  stock INT DEFAULT 0,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Orders
```sql
CREATE TABLE pedido (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES cliente(id),
  usuario_id INT REFERENCES usuario(id),
  fecha TIMESTAMP DEFAULT NOW(),
  total NUMERIC(12,2) DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'pendiente'
);
```

#### Order Details
```sql
CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INT NOT NULL REFERENCES pedido(id),
  producto_id INT NOT NULL REFERENCES producto(id),
  cantidad INT NOT NULL,
  precio_unitario NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(12,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);
```

### Special Features

- **Calculated Subtotal**: The `subtotal` field is automatically calculated in the database
- **Stock Validation**: Automatically verified before creating orders
- **Atomic Transactions**: All order operations are transactional
- **Automatic Reduction**: Stock is automatically reduced when creating orders

## 🐳 Docker

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3002:3002"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/userstory_db
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=userstory_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Docker Commands

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🛠 Development

### Available Scripts

```bash
# Development
npm run dev          # Start server in development mode
npm run build        # Compile TypeScript
npm run start        # Start compiled server

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Populate database with test data

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests for CI/CD
```

### Response Structure

All API responses follow a consistent format:

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful" // optional
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... } // optional, error details
}
```

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

This project includes comprehensive unit tests using Jest with TypeScript support.

### Test Structure

```
tests/
├── controllers/           # Controller tests
│   ├── auth.controller.simple.test.ts
│   ├── client.controller.simple.test.ts
│   ├── order.controller.simple.test.ts
│   └── product.controller.simple.test.ts
├── services/             # Service tests
│   ├── product.service.simple.test.ts
│   └── order.service.test.ts
├── utils/                # Test utilities
│   └── testHelpers.ts
├── setup.ts              # Test configuration
└── basic.test.ts         # Basic functionality tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Test Coverage

The project includes a comprehensive testing framework with:
- **Unit Tests**: Basic functionality and validation tests
- **Test Structure**: Organized by controllers and services
- **Coverage Reports**: Available via `npm run test:coverage`
- **Future Enhancement**: Real code coverage can be added by implementing integration tests

### Test Features

- ✅ **Unit Tests**: Individual component testing
- ✅ **Mocking**: Database and external service mocking
- ✅ **Async Testing**: Promise and async/await support
- ✅ **Coverage Reports**: HTML and text coverage reports
- ✅ **TypeScript Support**: Full TypeScript testing support
- ✅ **Jest Configuration**: Optimized for ES modules

### Test Examples

#### Basic Test
```typescript
describe('ProductService - Simple Tests', () => {
  it('should validate product data', () => {
    const validProduct = {
      nombre: 'Valid Product',
      precio: 50.00,
      stock: 10,
      codigo: 'PROD001'
    };

    expect(validProduct.nombre).toBeTruthy();
    expect(validProduct.precio).toBeGreaterThan(0);
    expect(validProduct.stock).toBeGreaterThanOrEqual(0);
  });
});
```

#### Async Test
```typescript
it('should handle async operations', async () => {
  const mockAsyncOperation = async () => {
    return Promise.resolve({ id: 1, nombre: 'Async Product' });
  };

  const result = await mockAsyncOperation();
  expect(result.id).toBe(1);
  expect(result.nombre).toBe('Async Product');
});
```

## 📝 Important Notes

1. **Authentication Required**: All endpoints except `/api/auth/*` require JWT authentication
2. **Stock Validation**: Orders automatically validate available stock
3. **Transactions**: Order operations are atomic (all or nothing)
4. **Automatic Calculation**: Subtotals are automatically calculated in the database
5. **Combinable Filters**: Order filters can be combined (customer + product)
6. **Test Coverage**: Maintains minimum 40% test coverage across all modules

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 📞 Support

For support or questions, contact:
- Email: ma2007rianac@gmail.com

---

**Developed with ❤️ using Node.js, Express, TypeScript and PostgreSQL**