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

async function addRegistrationCode({ temporaryCode, available }){
    
    try {
        const response = await ValidationCode.create({ temporaryCode: temporaryCode, available: available })
        return response
    } catch(err) {
        return {
            message: `The following error returned from database: ${err}`
        }
    }
}

async function validateCode(access_code){
    console.log(access_code)
    const rescuedCode = await ValidationCode.findOne({temporaryCode: access_code})
    if(rescuedCode && rescuedCode.available){
        response = await ValidationCode.updateOne({temporaryCode: "new-code"}, { available: false })
        return response
    } else {
        return false
    }
}

// async function invalidateCode(access_code){

//     await ValidationCode.updateOne({temporaryCode: "new-code"}, { available: false })
//     .catch(err => {
//         return "error when trying to update code status"
//     })

// }

module.exports = {
    validateCode,
    addRegistrationCode
}
