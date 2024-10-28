import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DB_URL!, {
    dialect: 'postgres',
    logging: false
});

async function initializeModels() {
    const { default: Product } = await import("../models/Product.model.js");
    db.addModels([Product]);
}

initializeModels().catch(console.error);

export default db;
