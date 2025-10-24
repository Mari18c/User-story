import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB, sequelize } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import clienteRoutes from "./routes/client.routes.js";
import routes from "./routes/index.js"; 


dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de Auth (register, login, refresh)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/clientes", clienteRoutes);
app.use("/api", routes);

// Ruta de prueba 
app.get("/api", (req, res) => res.json({ message: "API funcionando" }));

// Sincronizar modelos con la DB
await sequelize.sync({ alter: false, force: false });

// Conectar a la base de datos y arrancar el servidor
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, (error) => {
      if (error) throw error;
      console.log(`Server running on port ${PORT}`)
    } );
  })
  .catch((err) => console.error("Error al conectar DB:", err));


