const express = require("express")

const {
    httpGetAllTrainings,
    httpAddTraining,
    httpDeleteTraining,
    httpDeleteAllTrainings,
    httpUpdateTraining,
    httpGetStudentTraining
} = require("../controllers/training.controller")

const TrainingRouter = express.Router()

TrainingRouter.get("/", httpGetAllTrainings)
TrainingRouter.get("/:studentId", httpGetStudentTraining)
TrainingRouter.post("/", httpAddTraining)
TrainingRouter.delete("/", httpDeleteAllTrainings)

module.exports = TrainingRouter