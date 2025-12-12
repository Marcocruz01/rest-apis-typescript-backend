import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Nos conectamos a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.blue.bold('Conexión exitosa a la DB...'));
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos...'));
    }
}

// Mandamos a llamar la función
connectDB();

// Creamos la instancia del servidor Express
const server = express();

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'));
        }
    }
}
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'));

// Usamos el router para manejar las rutas desde "/"
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

// Exportamos el servidor para iniciarlo desde otro archivo (por ejemplo, index.js)
export default server;
