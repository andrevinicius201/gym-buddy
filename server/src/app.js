const express = require("express")
const cors = require("cors")
const app = express()
const path = require("path")

const exercisesRouter = require("./routers/exercises.router")
const studentsRouter = require("./routers/students.router")
const authRouter = require('./routers/auth.router');
const accessCodeRouter = require('./routers/access-code.router');


app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use("/exercises", exercisesRouter)
app.use("/students", studentsRouter)
app.use("/auth", authRouter)
app.use("/access-code", accessCodeRouter)
// app.use("/trainings", TrainingRouter) DEPRECATED - SOON IT WILL BE DELETED
 
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;