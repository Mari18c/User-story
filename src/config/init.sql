CREATE TABLE IF NOT EXISTS public.usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'vendedor' CHECK (rol IN ('admin', 'vendedor')),
  created_at TIMESTAMP DEFAULT NOW()
);

  CREATE TABLE IF NOT EXISTS public.cliente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS public.producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL,
  stock INT DEFAULT 0,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pedido (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES public.cliente(id) ON DELETE CASCADE,
  usuario_id INT REFERENCES public.usuario(id) ON DELETE SET NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  total NUMERIC(12,2) DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'cancelado'))
);
 
 CREATE TABLE IF NOT EXISTS public.detalle_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INT NOT NULL REFERENCES public.pedido(id) ON DELETE CASCADE,
  producto_id INT NOT NULL REFERENCES public.producto(id) ON DELETE CASCADE,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(12,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);

CREATE INDEX IF NOT EXISTS idx_pedido_cliente ON public.pedido (cliente_id);
CREATE INDEX IF NOT EXISTS idx_detalle_pedido ON public.detalle_pedido (pedido_id, producto_id);