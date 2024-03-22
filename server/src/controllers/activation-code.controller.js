
const { z } = require("zod")
const { addRegistrationCode, validateCode, getRegistrationCodes, getRegistrationCode } = require("../models/access-code.model")


async function httpGetAllRegistrationCodes(req, res){
    return res.status(200).json(await getRegistrationCodes()) 
}

async function httpGetRegistrationCode(req, res){
    return res.status(200).json(await getRegistrationCode(req.params.code)) 
}

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



module.exports = {httpValidateCode, httpAddRegistrationCode, httpGetAllRegistrationCodes, httpGetRegistrationCode}