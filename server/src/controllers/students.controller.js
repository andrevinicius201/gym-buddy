const { getAllStudents, addNewStudent, getStudentById, updateStudentTrainingData, deleteStudent, updateStudentExerciseDetails } = require("../models/students.model")


async function httpGetAllStudents(req, res){
    return res.status(200).json(await getAllStudents())
}

async function httpAddNewStudent(req, res){
    const newStudent = req.body
    return res.status(201).json(await addNewStudent(newStudent))
}

async function httpGetStudentById(req, res) {
    const searchedId = req.params.id
    return res.status(200).json(await getStudentById(searchedId))
}

async function httpUpdateStudentData(req, res){
    const studentId = req.params.id
    const newStudentData = req.body.trainingInfo
    return res.status(201).json(await updateStudentTrainingData(studentId, newStudentData))
}

async function httpDeleteStudent(req, res){
    const studentId = req.params.id
    return res.status(201).json(await deleteStudent(studentId))
}

async function httpUpdateExerciseDetails(req, res){
    const studentId = req.params.studentId
    const exerciseId = req.params.exerciseId
    const exerciseData = req.body
    return res.status(201).json(await updateStudentExerciseDetails(studentId, exerciseId, exerciseData))
}


module.exports = {
    httpGetAllStudents,
    httpAddNewStudent,
    httpGetStudentById,
    httpUpdateStudentData,
    httpDeleteStudent,
    httpUpdateExerciseDetails
}