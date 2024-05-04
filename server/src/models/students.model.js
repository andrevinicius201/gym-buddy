const Student = require("../models/students.mongo")
const Validator = require("../models/validator.model")
const bcrypt = require("bcrypt")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getAllStudents() {
    response = await prisma.student.findMany()
    return response
}

async function addNewStudent(user){ 
    // For a while it will stay deactivated
    // const userDataIsValid = await Validator.checkUserData(user)

    const userDataIsValid = true

    if(!userDataIsValid){
        return {
            code: 400,
            msg: "Error! 'activation_code' field is missing or invalid"
        }
    }

    try {
        
        const hashedPassword = await bcrypt.hash(user.name, 10)

        Object.assign(user, {
            password: hashedPassword,
            isActive: true,
        })
        
        const response = await prisma.student.create({
            data: user,
        });
        
        return response

    } catch(err){
        
        return {
            code: 400,
            msg: `The following error occurred: ${err}`
        }
    }

}

async function addStudentTraining(studentId, trainingDetails){
    const doc = await Student.findOne({ studentId: studentId });
    const update = { trainingData: trainingDetails };

    try {
        await doc.updateOne(update);
        await doc.save();
    } catch (err) {
        return {
            code: 404,
            msg: "No student was found with the given ID"
        }
    }


    return {
        code: 201,
        msg: "Student training updated succesfully"
    }
}

async function getStudentById(studentId){
    let integerStudentId = parseInt(studentId)
    
    const response = await prisma.student.findUnique({
        where: {
            studentId:integerStudentId
        }
    })
    
    if(response){
        return response
    } else {
        return {msg: "No student find with the specified criteria"}
    }  
}

async function getStudentByUserName(studentName){
    
    const response = await prisma.student.findUnique({
        where: {
            name:studentName
        }
    })
    
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
}


async function deleteStudent(studentId){
    
    let intStudentId = parseInt(studentId)
    const studentExists = await getStudentById(studentId)
   
    if(studentExists.msg == 'No student find with the specified criteria'){
        return "The specified student do not exists"
    }
   
    try {
        const response = await prisma.student.delete({
            where: {
              studentId: intStudentId,
            }
        })
        return response
    } catch (err){
        throw new Error(`The following error ocurred: ${err}`)
    }
    
}


async function deleteAllStudents(){
    const response = await prisma.student.deleteMany()
    return response
}


module.exports = {
    getAllStudents,
    addNewStudent,
    getStudentById,
    updateStudentExerciseDetails,
    deleteStudent,
    deleteAllStudents,
    addStudentTraining,
    getStudentByUserName
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