const express = require("express")

const { httpGetAllExercises, httpAddExercise, httpDeleteExercise, httpDeleteAllExercises, httpUpdateExercise } = require("../controllers/exercises.controller")

const rbacMiddleware = require('../middleware/rbacMiddleware');

const exercisesRouter = express.Router()

exercisesRouter.get("/", httpGetAllExercises)
exercisesRouter.post("/", 
    // rbacMiddleware.checkPermission('create_exercise'), 
httpAddExercise)

exercisesRouter.put("/:id", 
    // rbacMiddleware.checkPermission('update_exercise'), 
    httpUpdateExercise
)

exercisesRouter.delete("/:id", 
    // rbacMiddleware.checkPermission('delete_exercise'), 
    httpDeleteExercise
)
exercisesRouter.delete("/", 
    // rbacMiddleware.checkPermission('delete_all_exercises'), 
    httpDeleteAllExercises
)

module.exports = exercisesRouter