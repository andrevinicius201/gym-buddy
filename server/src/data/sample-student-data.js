const students = new Map();
const sampleStudentData = [
    {
        email: "André",
        trainingGoal: "Hipertrofia",
        studentTraining: {},
        isActive: true,
        name: ""
    },
    {
        email: "Gabriel",
        trainingGoal: "Emagrecimento",
        studentTraining: {},
        isActive: true,
        name: ""
    }
]

for(let i=0; i<sampleStudentData.length;i++){
    students.set(i+1, sampleStudentData[i])
}



module.exports = {
    students
}