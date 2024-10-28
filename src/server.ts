import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router.js";
import db from "./config/db.js"
import colors from "colors"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger.js";

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
const allowedOrigins = [
    'https://rest-api-product-management.onrender.com',
    process.env.FRONTEND_URL, // Ensure this is set correctly in your environment
    'https://frontend-product-manage-git-563f3f-thomas-schrodingers-projects.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is in the allowedOrigins array
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Reject the request
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    //credentials: true, // Include credentials if needed (e.g., cookies, authorization headers)
    optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};

// Use CORS middleware
server.use(cors(corsOptions));


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