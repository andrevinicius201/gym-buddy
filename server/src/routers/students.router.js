const express = require("express")

const { httpGetAllStudents, httpAddNewStudent, httpGetStudentById, httpUpdateStudentData, httpDeleteStudent, httpUpdateExerciseDetails } = require("../controllers/students.controller")

const studentsRouter = express.Router()

studentsRouter.get("/", httpGetAllStudents)
studentsRouter.post("/", httpAddNewStudent)
studentsRouter.get("/:id", httpGetStudentById)
studentsRouter.put("/:id", httpUpdateStudentData)
studentsRouter.put("/:email/:exerciseId", httpUpdateExerciseDetails)
studentsRouter.delete("/:id", httpDeleteStudent)


module.exports = studentsRouter