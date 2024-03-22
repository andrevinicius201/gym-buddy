const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    trainingId:{
        type: Number,
        required: true
    },
    trainingOnwerId:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        required: true   
    },
    exerciseIds: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Training", trainingSchema)