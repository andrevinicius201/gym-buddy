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
    let transformedExercistList = {}
    
    response.forEach(obj => {
        let exerciseId = obj.exerciseId
        transformedExercistList[exerciseId] = {
            exerciseName:obj.exerciseName,
            muscularGroup:obj.muscularGroup,
            exerciseDescription:obj.exerciseDescription

        }
    });
 
    return transformedExercistList
}


async function addExercise(exercise){
    const newExerciseId = await getLatestExerciseId() + 1;
    const newExercise = Object.assign(exercise, {
        exerciseId:newExerciseId
    })
    const response = await Exercise.create(newExercise);
    return response
}


async function deleteExercise(exerciseId){
    const response = await Exercise.deleteOne({ exerciseId: exerciseId })
    return response
}


async function deleteAllExercises(){
    const response = await Exercise.deleteMany()
    return response
}

async function updateExerciseDetails(exerciseId, updatedDetails){
    
    const doc = await Exercise.findOne({ exerciseId: exerciseId });
    const response = await doc.updateOne(updatedDetails);

    return response
}


module.exports = {
    getAllExercises,
    addExercise,
    deleteExercise,
    deleteAllExercises,
    updateExerciseDetails
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