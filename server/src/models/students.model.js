const Student = require("../models/students.mongo")
const Validator = require("../models/validator.model")
const bcrypt = require("bcrypt")

const DEFAULT_STUDENT_ID = 0;

async function getLatestStudentId() {
    const latestRegisteredStudent = await Student.findOne().sort('-studentId');
  
    if (!latestRegisteredStudent) {
      return DEFAULT_STUDENT_ID;
    }  
    return Number(latestRegisteredStudent.studentId);
}

async function getAllStudents() {
    response = await Student.find({})
    return response
}

async function addNewStudent(user){
    
    
    const userDataIsValid = await Validator.checkUserData(user)
    
    
    if(!userDataIsValid){
        return {
            code: 400,
            msg: "Error! 'activation_code' field is missing or invalid"
        }
    }

    try {
        
        const newStudentId = await getLatestStudentId() + 1;

        const hashedPassword = await bcrypt.hash(user.name, 10)

        Object.assign(user, {
            studentId: newStudentId,
            password: hashedPassword,
        })
        
    
        const response = await Student.create(user)
        
        return {
            code: 201,
            msg: "User successfully created!"
        }
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

    let filter = {
        studentId:studentId
    }

    const response = await Student.findOne(filter);
    if(response){
        return response
    } else {
        return {msg: "No student find with the specified criteria"}
    }  
}

async function getStudentByUserName(studentId){

    let filter = {
        name:studentId
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
}


async function deleteStudent(studentId){
    response = await Student.deleteOne({ studentId:studentId })
    if(response.deletedCount){
        return {
            code: 201,
            msg: "Student deleted successfully"
        }
    } else {
        return {
            code: 404,
            msg: "No student was found with the given studentId"
        }
    }
    
}


async function deleteAllStudents(){
    const response = await Student.deleteMany()
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