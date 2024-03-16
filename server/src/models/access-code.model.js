const mongoose = require("mongoose")

const accessCodeSchema = new mongoose.Schema({
    temporaryCode: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true  
    }
})

const ValidationCode = mongoose.model('access-codes', accessCodeSchema);

async function validateCode(access_code){
    const rescuedCode = await ValidationCode.findOne({temporaryCode: access_code})
    const code_available = rescuedCode ? true : false
    return code_available
}

async function invalidateCode(access_code){

    await ValidationCode.updateOne({temporaryCode: "codigo-exemplo"}, { available: false })
    .catch(err => {
        return "error when trying to update code status"
    })

}

module.exports = {
    validateCode,
    invalidateCode
}
