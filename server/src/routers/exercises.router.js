const express = require("express")

const { httpGetAllExercises, httpAddExercise } = require("../controllers/exercises.controller")

const exercisesRouter = express.Router()

exercisesRouter.get("/", httpGetAllExercises)
exercisesRouter.post("/", httpAddExercise)

module.exports = exercisesRouter