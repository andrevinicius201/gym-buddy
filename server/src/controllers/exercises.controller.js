const { getAllExercises, addExercise, deleteExercise, deleteAllExercises, updateExerciseDetails } = require("../models/exercises.model")


async function httpGetAllExercises(req, res){
    return res.status(200).json(await getAllExercises())
}

async function httpAddExercise(req, res){
    const newExercise = req.body
    return res.status(201).json(await addExercise(newExercise))
}

async function httpDeleteExercise(req, res){
    console.log(req.params.id)
    return res.status(201).json(await deleteExercise(req.params.id))
}

async function httpUpdateExercise(req, res){

    const exerciseId = req.params.id
    const udpatedExerciseDetails = req.body
    console.log(udpatedExerciseDetails)
    return res.status(201).json(await updateExerciseDetails(exerciseId, udpatedExerciseDetails))
}


async function httpDeleteAllExercises(req, res){
    return res.status(201).json(await deleteAllExercises())
}


module.exports = {
    httpGetAllExercises,
    httpAddExercise,
    httpDeleteExercise,
    httpDeleteAllExercises,
    httpUpdateExercise
}