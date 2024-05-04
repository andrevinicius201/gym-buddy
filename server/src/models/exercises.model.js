const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    response = await prisma.exercise.findMany()
    return response

}


async function addExercise(exercise){
    
    const response = await prisma.exercise.create({
        data: exercise,
    });
    
    return {
        code: 201,
        msg: "Exercise successfully created!"
    }
}

async function deleteExercise(exerciseId){
    let intExerciseId = parseInt(exerciseId)
    const response = await prisma.exercise.delete({
        where: {
            exerciseId: intExerciseId,
        }
    })
    return response
}


async function deleteAllExercises(){
    const response = await prisma.exercise.deleteMany()
    return response
}

async function updateExerciseDetails(exerciseId, updatedDetails){
    
    if(exerciseExists.msg == 'No student find with the specified criteria'){
        return "The specified student do not exists"
    }

    const response = await prisma.exercise.update({
        where: {
            exerciseId: parseInt(exerciseId),
        },
        data: {
            exerciseName: updatedDetails.exerciseName,
            muscularGroup: updatedDetails.muscularGroup,
            description: updatedDetails.description,
        }
      })

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