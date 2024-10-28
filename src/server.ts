import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
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

// Allow CORS
const corsOptions: CorsOptions = {
    origin:  function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            //console.log("👍")
            callback(null, true)
        } else {
            //console.log("👎")
            callback(new Error("Not allowed by CORS"))
        } 
    }
}

server.use(cors(corsOptions))

// Leer Datos de formularios
server.use(express.json())

server.use(morgan("dev"))

server.use('/api/products', router)

/*
server.get('/api', (req, res) => {
    res.json({msg: "API"})
})
*/

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server