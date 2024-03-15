// let currentExerciseId = 0
// const exercises = new Map();
// const { exercises } = require("../data/sample-exercise-data")
const Exercise = require("../models/exercises.mongo")

const DEFAULT_EXERCISE_ID = 0;

async function getLatestExerciseId() {
    const latestRegisteredExercise = await Exercise.findOne().sort('-exerciseId');
  
    if (!latestRegisteredExercise) {
      return DEFAULT_EXERCISE_ID;
    }  
    return latestRegisteredExercise.exerciseId;
}

async function getAllExercises() {
    response = await Exercise.find({})
    return response
}


async function addExercise(exercise){
    const newExerciseId = await getLatestExerciseId() + 1;
    const newExercise = Object.assign(exercise, {
        exerciseId:newExerciseId
    })
    const response = await Exercise.create(newExercise);
    return response
}


module.exports = {
    getAllExercises,
    addExercise
}


// The following implementations are legacy and were used only for tests.
// function getAllExercises(){
//     return Array.from(Exercise.values())
// }

// function addExercise(exercise){
//     currentExerciseId++
//     const newExercise = Object.assign(exercise, {
//         exerciseId: currentExerciseId,  
//     })
//     exercises.set(currentExerciseId, newExercise)
//     return newExercise
// }