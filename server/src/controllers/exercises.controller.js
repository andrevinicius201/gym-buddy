const { getAllExercises, addExercise } = require("../models/exercises.model")


async function httpGetAllExercises(req, res){
    return res.status(200).json(await getAllExercises())
}

async function httpAddExercise(req, res){
    const newExercise = req.body
    return res.status(201).json(await addExercise(newExercise))
}


module.exports = {
    httpGetAllExercises,
    httpAddExercise
}