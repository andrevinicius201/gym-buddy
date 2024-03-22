const express = require("express")

const { httpGetAllExercises, httpAddExercise, httpDeleteExercise, httpDeleteAllExercises, httpUpdateExercise } = require("../controllers/exercises.controller")

const exercisesRouter = express.Router()

exercisesRouter.get("/", httpGetAllExercises)
exercisesRouter.post("/", httpAddExercise)
exercisesRouter.put("/:id", httpUpdateExercise)
exercisesRouter.delete("/:id", httpDeleteExercise)
exercisesRouter.delete("/", httpDeleteAllExercises)

module.exports = exercisesRouter