import express from "express";
import router from "./router";
import db from "./config/db"
import colors from "colors"

// Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold("Database connected"))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("There was an error connecting to the database"))
    }
}

connectDB()

const server = express();

server.use('/api/products', router)

export default server