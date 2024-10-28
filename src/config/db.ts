import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";
import Product from "../models/Product.model.js";

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const modelsPath = path.join(__dirname, "../models");

const db = new Sequelize(process.env.DB_URL!, {
    dialect: 'postgres',
    logging: false,
    models: [Product]
});

db.addModels([modelsPath]);

export default db;
