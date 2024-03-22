const express = require("express")

const { httpGetAllStudents, httpAddNewStudent, httpGetStudentById, httpUpdateStudentData, httpDeleteStudent, httpUpdateExerciseDetails, httpDeleteAllStudents, httpAddStudentTraining } = require("../controllers/students.controller")

const usersRouter = express.Router()

usersRouter.get("/", httpGetAllStudents)
usersRouter.post("/", httpAddNewStudent)
usersRouter.put("/:studentId/training", httpAddStudentTraining)
usersRouter.get("/:id", httpGetStudentById)
usersRouter.put("/:id", httpUpdateStudentData)
usersRouter.delete("/:studentId", httpDeleteStudent)
usersRouter.delete("/", httpDeleteAllStudents)


module.exports = usersRouter