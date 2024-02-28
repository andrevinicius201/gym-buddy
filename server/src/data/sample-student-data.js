const students = new Map();
const sampleStudentData = [
    {
        studentId: 1,
        name: "André Vinicius",
        trainingGoal: "Hipertrofia"
        
    },
    {
        studentId: 2,
        name: "Gabriel",
        trainingGoal: "Emagrecimento"
    }
]

for(let i=0; i<sampleStudentData.length;i++){
    students.set(i+1, sampleStudentData[i])
}



module.exports = {
    students
}