const Training = require("../models/training.mongo")

const DEFAULT_TRAINING_ID = 0;

async function getLatestTrainingId() {
    const latestRegisteredTraining = await Training.findOne().sort('-trainingId');

  
    if (!latestRegisteredTraining) {
      return DEFAULT_TRAINING_ID;
    }  
    return Number(latestRegisteredTraining.trainingId);
}

async function getAllTrainings() {
    response = await Training.find({})
    return response
}

async function getStudentTraining(studentId) {
    const response = await Training.find({"trainingOnwerId":studentId, "active":true})
    if(response.length == 0){
        return {
            code: 404,
            msg: "No training were found for the given student"
        }
    }
    return {
        code: 200,
        training: response
    }
}


async function addTraining(training){
    const newTrainingId = await getLatestTrainingId() + 1;
    const newTraining = Object.assign(training, {
        trainingId:newTrainingId
    })
    const response = await Training.create(newTraining);
    return response
}


async function deleteTraining(TrainingId){
    const response = await Training.deleteOne({ TrainingId: TrainingId })
    return response
}


async function deleteAllTrainings(){
    const response = await Training.deleteMany()
    return response
}

async function updateTrainingDetails(TrainingId, updatedDetails){
    
    const doc = await Training.findOne({ TrainingId: TrainingId });
    const response = await doc.updateOne(updatedDetails);

    return response
}


module.exports = {
    getAllTrainings,
    addTraining,
    deleteTraining,
    deleteAllTrainings,
    updateTrainingDetails,
    getStudentTraining
}
