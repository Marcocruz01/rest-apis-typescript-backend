import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DATABASE_URL);

// Conectamos a la base de datos usando Sequelize.
const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    models: [__dirname + '/../models/**/*']
});

// Exportamos la instancia para usarla en modelos o en la conexión del servidor
export default db;
