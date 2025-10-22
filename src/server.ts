import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './config/db';
import { initModels } from './models';

const PORT = process.env.PORT || 3008;

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión exitosa a la base de datos');

    await initModels(); // 👈 Carga los modelos aquí

    app.listen(PORT, () => {
      console.log(` Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(' Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
