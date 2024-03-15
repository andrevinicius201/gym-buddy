// const students = new Map();
// const { students } = require("../data/sample-student-data")
const Student = require("../models/students.mongo")


const DEFAULT_STUDENT_ID = 0;

async function getLatestStudentId() {
    const latestRegisteredUser = await Student.findOne().sort('-studentId');
  
    if (!latestRegisteredUser) {
      return DEFAULT_STUDENT_ID;
    }  
    return latestRegisteredUser.studentId;
}

async function getAllStudents() {
    response = await Student.find({})
    return response
}

async function addNewStudent(student){
    const newStudentId = await getLatestStudentId() + 1;
    console.log(newStudentId)
    const newStudent = Object.assign(student, {
        studentId:newStudentId
    })
    const response = await Student.create(newStudent);
    return response
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


async function updateStudentExerciseDetails(studentId, exerciseId, exerciseData){

    const studendDataBeforeUpdate = await getStudentById(studentId);
    
    const studentTrainingData = studendDataBeforeUpdate.studentTraining ? studendDataBeforeUpdate.studentTraining : {}
    studentTrainingData[exerciseId] = exerciseData
    
    
    await Student.updateOne({ studentId: studentId }, {
        studentTraining: studentTrainingData
    });
    
    return await await getStudentById(studentId);

}

async function deleteStudent(studentId){
    await Student.deleteOne({ studentId:studentId })
    return {
        msg: "Student deleted successfully"
    }
}


// function deleteStudent(studentId){
//     const currentStudentData = getStudentById(studentId)
    
//     const updatedStudent = Object.assign(currentStudentData, {
//         isActive: false
//     })
    
//     return updatedStudent
// }

module.exports = {
    getAllStudents,
    addNewStudent,
    getStudentById,
    updateStudentExerciseDetails,
    deleteStudent
}






// The following implementations are legacy and were used only for tests.

// function addNewStudent(student){
//     currentStudentId++
//     const newStudent = Object.assign(student, {
//         studentId: currentStudentId,  
//     })
//     students.set(currentStudentId, newStudent)
//     return newStudent
// }

// function getAllStudents(){
//     return Array.from(students.values()).filter((student) => student.isActive == true);
// }

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