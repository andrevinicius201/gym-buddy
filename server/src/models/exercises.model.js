let currentExerciseId = 0
// const exercises = new Map();
const { exercises } = require("../data/sample-exercise-data")

function getAllExercises(){
    return Array.from(exercises.values())
}

function addExercise(exercise){
    currentExerciseId++
    const newExercise = Object.assign(exercise, {
        exerciseId: currentExerciseId,  
    })
    exercises.set(currentExerciseId, newExercise)
    return newExercise
}

module.exports = {
    getAllExercises,
    addExercise
}