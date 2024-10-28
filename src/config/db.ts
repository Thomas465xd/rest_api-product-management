import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from 'path';
import Product from "../models/Product.model";

dotenv.config();

// Cambiar el nombre de la variable a algo como 'baseDir'
const baseDir = path.resolve();

const db = new Sequelize(process.env.DB_URL!, {
    models: [Product],
    dialect: 'postgres',
    logging: false 
});

db.addModels([path.join(baseDir, 'src/models/*')]); // Ajusta la ruta según tu estructura de carpetas

export default db;
