const express = require("express")
const app = express()
const exercisesRouter = require("./routers/exercises.router")
const studentsRouter = require("./routers/students.router")
const cors = require("cors")
const path = require("path")

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use("/exercises", exercisesRouter)
app.use("/students", studentsRouter)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;