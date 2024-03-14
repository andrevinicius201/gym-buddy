let currentStudentId = 0
// const students = new Map();
// const { students } = require("../data/sample-student-data")
const students = require("../models/students.mongo")


// function getAllStudents(){
//     return Array.from(students.values()).filter((student) => student.isActive == true);
// }

// function addNewStudent(student){
//     currentStudentId++
//     const newStudent = Object.assign(student, {
//         studentId: currentStudentId,  
//     })
//     students.set(currentStudentId, newStudent)
//     return newStudent
// }


async function addNewStudent(student){
    const response = await students.create(student);
    return response
}

// function getStudentById(studentId){
//     const response = students.get(Number(studentId))
//     return response
// }

// function updateStudentTrainingData(studentId, trainingData){
//     const currentStudentData = getStudentById(studentId)
    
//     const updatedStudent = Object.assign(currentStudentData, {
//         studentTraining: trainingData
//     })

//     return updatedStudent
// }

// function updateStudentExerciseDetails(studentId, exerciseId, exerciseData){
//     const updatedStudent = getStudentById(studentId)
//     updatedStudent.studentTraining[exerciseId] = exerciseData
//     return updatedStudent
    
    
// }

// function deleteStudent(studentId){
//     const currentStudentData = getStudentById(studentId)
    
//     const updatedStudent = Object.assign(currentStudentData, {
//         isActive: false
//     })
    
//     return updatedStudent
// }

module.exports = {
    // getAllStudents,
    addNewStudent,
    // getStudentById,
    // updateStudentTrainingData,
    // deleteStudent,
    // updateStudentExerciseDetails
}