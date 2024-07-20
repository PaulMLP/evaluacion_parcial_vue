FROM node:16-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

RUN npm run build

# Servir la aplicación con Nginx
FROM nginx:alpine AS production-stage

# Copiar los archivos construidos desde la etapa de construcción a la ubicación de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
