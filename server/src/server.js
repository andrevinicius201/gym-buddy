const http = require("http")
const { PrismaClient } = require('@prisma/client');
const mongoose = require("mongoose")
require("dotenv").config()

app = require("./app")

const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000
const server = http.createServer(app)

// const MONGO_USERNAME = process.env.MONGO_DB_USERNAME
// const MONGO_PASSWORD = process.env.MONGO_DB_PASSWORD
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@gymbuddy.p1kpqcn.mongodb.net/?retryWrites=true&w=majority&appName=gymbuddy`

// mongoose.connection.on("connecting", () => {
//     console.log('Trying to connect to MongoDB database')
// })

// mongoose.connection.once("open", () => {
//     console.log('MongoDB successfully connected')
// })
// mongoose.connection.on("error", (err) => {
//     console.error(`Error when connecting with MongoDB Cluster ${err}`)
// })



async function startServer(){
    // await mongoose.connect(MONGO_URL)
    server.listen(PORT, () => {
        console.log(`Listening port ${PORT}`)
    })
}

startServer();