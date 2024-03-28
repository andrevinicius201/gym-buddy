const express = require("express")
const { httpGetAllStudents, httpAddNewStudent, httpGetStudentById, httpUpdateStudentData, httpDeleteStudent, httpUpdateExerciseDetails, httpDeleteAllStudents, httpAddStudentTraining } = require("../controllers/students.controller")

const rbacMiddleware = require('../middleware/rbacMiddleware');

const usersRouter = express.Router()

usersRouter.get("/", rbacMiddleware.checkPermission('get_all_users'), httpGetAllStudents)
usersRouter.get("/:id", rbacMiddleware.checkPermission('get_user'), httpGetStudentById)

usersRouter.post("/", 
    rbacMiddleware.checkPermission('register_user'), 
    httpAddNewStudent
)

usersRouter.put("/:studentId/training", rbacMiddleware.checkPermission('update_user_training'), httpAddStudentTraining)


usersRouter.delete("/:studentId", rbacMiddleware.checkPermission('delete_user'), httpDeleteStudent)
usersRouter.delete("/", rbacMiddleware.checkPermission('delete_user'), httpDeleteAllStudents)

// will be used only for updating user personal data. Currently not related to any screen
usersRouter.put("/:id", rbacMiddleware.checkPermission('update_user'), httpUpdateStudentData)


module.exports = usersRouter