const mongoose = require("mongoose")

const activationCodeSchema = new mongoose.Schema({
    activation_code: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true  
    },
    expirationTime: {
        type: Date,
        required: true 
    } 
})

const ActivationCode = mongoose.model('activation-codes', activationCodeSchema);


async function getActivationCodes(){
   
    const response = await ActivationCode.find()
    
    if(response.length == 0){
        return {msg:"No activation codes found"}
    }

    return response

}

async function getActivationCode(activationCode){
   
    const response = await ActivationCode.find({activation_code:activationCode})
    
    if(response.length == 0){
        return {msg:"No activation codes found"}
    }

    return response

}


async function addActivationCode({ activation_code, available }){

    let currentTime  = new Date()
    let next30Days = currentTime.getTime() + 30 * 24 * 60 * 60 * 1000;
    let next30DaysTimestamp = new Date(next30Days).getTime();
    
    
    try {
        const response = await ActivationCode.create({ activation_code: activation_code, available: available, expirationTime: next30DaysTimestamp })      
        return {
            code: 201,
            message: `activation code was successfully created`
        }
    } catch(err) {
        return {
            code: 400,
            message: `The following error returned from database: ${err}`
        }
    }
}

async function validateActivationCode(activation_code){
    const rescuedCode = await ActivationCode.findOne({activation_code: activation_code})
    if(rescuedCode && rescuedCode.available){
        response = await ActivationCode.updateOne({activation_code: activation_code}, { available: false })
        return true
    } else {
        return false
    }
}

async function deleteAllActivationCodes(){
    const response = await ActivationCode.deleteMany()
    return response
}



module.exports = {
    getActivationCodes,
    getActivationCode,
    addActivationCode,
    validateActivationCode,
    deleteAllActivationCodes
}
