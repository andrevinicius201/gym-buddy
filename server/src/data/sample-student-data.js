const students = new Map();
const sampleStudentData = [
    {
        studentId: 1,
        name: "André Vinicius",
        trainingGoal: "Hipertrofia",
        studentTraining: {},
        isActive: true
        
    },
    {
        studentId: 2,
        name: "Gabriel",
        trainingGoal: "Emagrecimento",
        studentTraining: {},
        isActive: true
    }
]

for(let i=0; i<sampleStudentData.length;i++){
    students.set(i+1, sampleStudentData[i])
}



module.exports = {
    students
}