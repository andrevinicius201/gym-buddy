const { getAllStudents, addNewStudent, getStudentById, updateStudentTrainingData, deleteStudent, updateStudentExerciseDetails, deleteAllStudents, addStudentTraining } = require("../models/students.model")

async function httpGetAllStudents(req, res){
    return res.status(200).json(await getAllStudents())
}

async function httpAddNewStudent(req, res){   
    response = await addNewStudent(req.body)
    return res.status(response.code).json(response) 
}

async function httpAddStudentTraining(req, res){
    const studentId = req.params.studentId
    const trainingDetails = req.body
    response = await addStudentTraining(studentId,trainingDetails)
    return res.status(201).json(response) 
}

async function httpGetStudentById(req, res) {
    const searchedId = req.params.id
    return res.status(200).json(await getStudentById(searchedId))
}

async function httpUpdateStudentData(req, res){
    const email = req.params.id
    const newStudentData = req.body.trainingInfo
    return res.status(201).json(await updateStudentTrainingData(email, newStudentData))
}

async function httpDeleteStudent(req, res){
    const studentId = req.params.studentId
    return res.status(201).json(await deleteStudent(studentId))
}


async function httpDeleteAllStudents(req, res){
    return res.status(201).json(await deleteAllStudents())
}

async function httpUpdateExerciseDetails(req, res){
    const email = req.params.email
    const exerciseId = req.params.exerciseId
    const exerciseData = req.body
    return res.status(201).json(await updateStudentExerciseDetails(email, exerciseId, exerciseData))
}


module.exports = {
    httpGetAllStudents,
    httpAddNewStudent,
    httpGetStudentById,
    httpUpdateStudentData,
    httpDeleteStudent,
    httpUpdateExerciseDetails,
    httpDeleteAllStudents,
    httpAddStudentTraining
}