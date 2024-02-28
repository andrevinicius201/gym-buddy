const exercises = new Map();
const sampleExerciseData = [
    {
        exerciseName: "Supino reto",
        muscularGroup: "Superiores",
        exerciseDescription: "Exercicio para peito",
        exerciseId: 1
    },
    {
        exerciseName: "Leg press",
        muscularGroup: "Inferiores",
        exerciseDescription: "Exercicio para pernas",
        exerciseId: 2
    },
    {
        exerciseName: "Biceps concentrado",
        muscularGroup: "Superiores",
        exerciseDescription: "Exercicio para biceps",
        exerciseId: 3
    },
    {
        exerciseName: "Abd infra",
        muscularGroup: "Abdomen",
        exerciseDescription: "Fortalecimento quadril",
        exerciseId: 4
    }
]


for(let i=1; i<=sampleExerciseData.length;i++){
    exercises.set(i, sampleExerciseData[i-1])
}

module.exports = {
    exercises
}