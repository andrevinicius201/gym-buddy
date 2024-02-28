const express = require("express")

const { httpGetAllStudents, httpAddNewStudent, httpGetStudentById, httpUpdateStudentData } = require("../controllers/students.controller")

const studentsRouter = express.Router()

studentsRouter.get("/", httpGetAllStudents)
studentsRouter.post("/", httpAddNewStudent)
studentsRouter.get("/:id", httpGetStudentById)
studentsRouter.put("/:id", httpUpdateStudentData)


module.exports = studentsRouter