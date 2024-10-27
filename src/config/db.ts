import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from "../models/Product.model";

dotenv.config()

// Utiliza import.meta.url para obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DB_URL!,  {
    models: [Product],
    dialect: 'postgres',
    logging: false 
})

db.addModels([__dirname + '/../models/*.ts'])

export default db 