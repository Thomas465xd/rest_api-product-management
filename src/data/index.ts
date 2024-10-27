import { exit } from "node:process"
import db from "../config/db"

const clearDB = async () => {
    try {
        // Deletes all the data in the database
        await db.sync({force: true})
        console.log("Database cleared")
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "--clear") {
    clearDB()
}

console.log(process.argv)