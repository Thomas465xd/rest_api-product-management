import express from "express";
import router from "./router";
import db from "./config/db"
import colors from "colors"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";

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

/*
server.get('/api', (req, res) => {
    res.json({msg: "API"})
})
*/

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server