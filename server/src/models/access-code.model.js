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


async function getRegistrationCodes(){
   
    const response = await ValidationCode.find()
    
    if(response.length == 0){
        return {msg:"No registration codes found"}
    }

    return response

}

async function getRegistrationCode(registrationCode){
   
    const response = await ValidationCode.find({temporaryCode:registrationCode})
    
    if(response.length == 0){
        return {msg:"No registration codes found"}
    }

    return response

}


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
    const rescuedCode = await ValidationCode.findOne({temporaryCode: access_code})
    if(rescuedCode && rescuedCode.available){
        response = await ValidationCode.updateOne({temporaryCode: access_code}, { available: false })
        return true
    } else {
        return false
    }
}


module.exports = {
    validateCode,
    addRegistrationCode,
    getRegistrationCodes,
    getRegistrationCode
}
