const bcrypt = require('bcrypt');

const { getAllStudents, addNewStudent, getStudentById, updateStudentTrainingData, deleteStudent, updateStudentExerciseDetails } = require("../models/students.model")


async function httpGetAllStudents(req, res){
    return res.status(200).json(await getAllStudents())
}

async function httpAddNewStudent(req, res){

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const student = req.body
    
    Object.assign(student, {
        password: hashedPassword,
    })

    
    return res.status(201).json(await addNewStudent(student))
    
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
    const email = req.params.id
    return res.status(201).json(await deleteStudent(email))
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
    httpUpdateExerciseDetails
}