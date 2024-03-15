const mongoose = require("mongoose")

const accessCodeSchema = new mongoose.Schema({
    temporaryCode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AccessCode', accessCodeSchema)