const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentId: {
      type: Number,
      required: true
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
        type: Object,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false 
    }
  });
  
  
  module.exports = mongoose.model('Student', studentSchema)