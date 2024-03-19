
const { z } = require("zod")
const { addRegistrationCode, validateCode } = require("../models/access-code.model")

async function httpAddRegistrationCode(req, res){

    
    const registrationPayload = {
        temporaryCode: req.body.temporaryCode,
        available:true
    }

    
    return res.status(201).json(await addRegistrationCode(registrationPayload))
  
}

async function httpValidateCode(req, res){
    const validationCode = req.body.validationCode
    return res.status(201).json(await validateCode(validationCode))
}

// async function httpInvalidateCode(registration_code){
//     const invalidation = await invalidateCode(registration_code)
//     console.log(invalidation)
//     return 
// }


module.exports = {httpValidateCode, httpAddRegistrationCode}