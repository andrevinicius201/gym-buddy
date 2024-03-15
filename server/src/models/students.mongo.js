const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true  
    },
    trainingData: {
        type: Object,
        required: false  
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    trainingGoal: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false 
    },
    role: {
        type: String,
        required: false 
    }

  });
  
  
  module.exports = mongoose.model('Student', studentSchema)