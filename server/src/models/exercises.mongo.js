const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    exerciseId: {
      type: Number,
      required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    muscularGroup: {
        type: String,
        required: false
    },
    exerciseDescription: {
        type: String,
        required: false
    }
  });
  
  
  module.exports = mongoose.model('Exercise', exerciseSchema)
