const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: false  
    },
    trainingData: {
        type: Object,
        required: false  
    },
    
    trainingGoal: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false 
    },

    activation_code: {
        type: String,
        required: false    
    }

  });
  
  
  module.exports = mongoose.model('Student', studentSchema)