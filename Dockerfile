# Imagen base de Node.js
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (debe coincidir con tu .env)
EXPOSE 3008

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]
