const { getAllStudents, addNewStudent, getStudentById, updateStudentTrainingData } = require("../models/students.model")


function httpGetAllStudents(req, res){
    return res.status(200).json(getAllStudents())
}

function httpAddNewStudent(req, res){
    const newStudent = req.body
    return res.status(201).json(addNewStudent(newStudent))
}

function httpGetStudentById(req, res) {
    const searchedId = req.params.id
    return res.status(200).json(getStudentById(searchedId))
}

function httpUpdateStudentData(req, res){
    const studentId = req.params.id
    const newStudentData = req.body.trainingInfo
    return res.status(201).json(updateStudentTrainingData(studentId, newStudentData))
}



module.exports = {
    httpGetAllStudents,
    httpAddNewStudent,
    httpGetStudentById,
    httpUpdateStudentData
}