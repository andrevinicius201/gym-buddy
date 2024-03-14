const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentId: {
      type: Number,
      required: false
    },
    name: {
        type: String,
        required: true
    },
    trainingGoal: {
        type: String,
        required: false
    },
    studentTraining: {
        type: String,
        required: false
    },
    isActive: {
        type: String,
        required: false 
    }
  });
  
  
  module.exports = mongoose.model('Student', studentSchema)