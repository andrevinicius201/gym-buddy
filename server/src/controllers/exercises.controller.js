const { getAllExercises, addExercise } = require("../models/exercises.model")


function httpGetAllExercises(req, res){
    return res.status(200).json(getAllExercises())
}

function httpAddExercise(req, res){
    const newExercise = req.body
    return res.status(201).json(addExercise(newExercise))
}


module.exports = {
    httpGetAllExercises,
    httpAddExercise
}