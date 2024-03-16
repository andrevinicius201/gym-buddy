// const students = new Map();
// const { students } = require("../data/sample-student-data")
const studentsMongo = require("../models/students.mongo");
const Student = require("../models/students.mongo")

async function getAllStudents() {
    response = await Student.find({})
    return response
}

async function addNewStudent(student){
    const response = await Student.create(student);
    return response
}

async function getStudentById(email){

    let filter = {
        email:email
    }
    const response = await Student.findOne(filter);
    if(response){
        return response
    } else {
        return {msg: "No student find with the specified criteria"}
    }  
}


async function updateStudentExerciseDetails(email, exerciseId, exerciseData) {
    
    const doc = await Student.findOne({ email: email });
    let previousTraining = doc.trainingData

    if(!previousTraining){
        previousTraining = {
            [exerciseId]: exerciseData
        }
    } else {   
        previousTraining[exerciseId] = exerciseData
    }

    const update = { trainingData: previousTraining };

    await doc.updateOne(update);

    // await doc.save();
    
}


async function deleteStudent(email){
    await Student.deleteOne({ email:email })
    return {
        msg: "Student deleted successfully"
    }
}


module.exports = {
    getAllStudents,
    addNewStudent,
    getStudentById,
    updateStudentExerciseDetails,
    deleteStudent
}






// The following implementations are legacy and were used only for tests.

// function addNewStudent(student){
//     currentemail++
//     const newStudent = Object.assign(student, {
//         email: currentemail,  
//     })
//     students.set(currentemail, newStudent)
//     return newStudent
// }

// function getAllStudents(){
//     return Array.from(students.values()).filter((student) => student.isActive == true);
// }

// function getStudentById(email){
//     const response = students.get(Number(email))
//     return response
// }

// function updateStudentTrainingData(email, trainingData){
//     const currentStudentData = getStudentById(email)
    
//     const updatedStudent = Object.assign(currentStudentData, {
//         studentTraining: trainingData
//     })

//     return updatedStudent
// }

// function updateStudentExerciseDetails(email, exerciseId, exerciseData){
//     const updatedStudent = getStudentById(email)
//     updatedStudent.studentTraining[exerciseId] = exerciseData
//     return updatedStudent 
// }

// function deleteStudent(email){
//     const currentStudentData = getStudentById(email)
    
//     const updatedStudent = Object.assign(currentStudentData, {
//         isActive: false
//     })
    
//     return updatedStudent
// }