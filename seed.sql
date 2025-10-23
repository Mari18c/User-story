INSERT INTO usuario (nombre, email, password, rol)
VALUES
  ('Administrador', 'admin@sportsline.com', 'admin123', 'admin'),
  ('Laura Gómez', 'laura.gomez@sportsline.com', 'laura123', 'vendedor'),
  ('Carlos Pérez', 'carlos.perez@sportsline.com', 'carlos123', 'vendedor')
ON CONFLICT (email) DO NOTHING;

INSERT INTO producto (nombre, descripcion, precio, stock, codigo)
VALUES
  ('Balón de fútbol', 'Balón profesional tamaño 5', 85000, 20, '111'),
  ('Guantes de arquero', 'Guantes con protección en dedos', 120000, 10, '222'),
  ('Camiseta deportiva', 'Camiseta transpirable talla M', 45000, 30, '333')
ON CONFLICT DO NOTHING;
