import express from "express";
import router from "./router";
import db from "./config/db"
import colors from "colors"

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.green.bold("Database connected"))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold("Database connection error"))
    }
}

connectDB()

// Instancia de Express
const server = express();

// Leer Datos de formularios
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: "API"})
})

export default server