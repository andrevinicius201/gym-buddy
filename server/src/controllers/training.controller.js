const { getAllTrainings, addTraining, deleteTraining, deleteAllTrainings, updateTrainingDetails, getStudentTraining } = require("../models/training.model")


async function httpGetAllTrainings(req, res){
    return res.status(200).json(await getAllTrainings())
}

async function httpGetStudentTraining(req, res){
    return res.status(200).json(await getStudentTraining(req.params.studentId))
}

async function httpAddTraining(req, res){
    const newTraining = req.body
    return res.status(201).json(await addTraining(newTraining))
}

async function httpDeleteTraining(req, res){
    console.log(req.params.id)
    return res.status(201).json(await deleteTraining(req.params.id))
}

async function httpUpdateTraining(req, res){

    const TrainingId = req.params.id
    const udpatedTrainingDetails = req.body
    console.log(udpatedTrainingDetails)
    return res.status(201).json(await updateTrainingDetails(TrainingId, udpatedTrainingDetails))
}


async function httpDeleteAllTrainings(req, res){
    return res.status(201).json(await deleteAllTrainings())
}


module.exports = {
    httpGetAllTrainings,
    httpAddTraining,
    httpDeleteTraining,
    httpDeleteAllTrainings,
    httpUpdateTraining,
    httpGetStudentTraining
}