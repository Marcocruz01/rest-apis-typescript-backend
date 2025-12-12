# Frontend para API REST de Productos

Este repositorio contiene el código fuente del backend de la aplicación de gestión de productos, diseñada para interactuar con la API REST del proyecto.
el cual usamos un stack PERN (PostgreSQL, Express, React, Node.js), te permite crear nuevos productos, editar la información de algun producto o eliminar productos.

## Características

- **Estructura de API RESTful:** Implementación de rutas y handlers para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los productos.
- **Base de Datos:** Configuración para la conexión a una base de datos utilizando Sequelize (el archivo server.ts muestra la lógica de conexión).
- **Manejo de Rutas y Middleware:** Las rutas están organizadas en router.ts y utilizan middleware de express-validator para la validación de los datos de entrada (como nombre, precio y disponibilidad).
- **Documentación de API:** La API está documentada utilizando Swagger, con endpoints para:
  - **GET /api/products:** Obtener todos los productos.
  - **GET /api/products/{id}:** Obtener un producto por ID.
  - **POST /api/products:** Crear un nuevo producto.
  - **PUT /api/products/{id}:** Actualizar un producto completo.
  - **PATCH /api/products/{id}:**Actualizar la disponibilidad de un producto.
  - **DELETE /api/products/{id}:** Acción dedicada para eliminar registros (deleteProductAction).
- Configuración de Servidor: El servidor se inicia en el puerto 4000 (o el que se defina en las variables de entorno) y utiliza morgan para logging de peticiones.
- CORS: Configuración de CORS para permitir conexiones desde una URL de frontend específica (process.env.FRONTEND_URL).
  
## Tech Stack

**Servidor:** 
- Node.js.
- Express.
- TypeScript
- Sequelize (para ORM y DB)
- express-validator.
- Swagger/OpenAPI (para documentación)
  
## Autor

- [@Marcocruz01](https://github.com/Marcocruz01)


## Vista General
![vista previa](./products.png)
![vista previa](./add_product.png)
![vista previa](./edit_product.png)
