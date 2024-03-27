
const { z } = require("zod")
const {     
    getActivationCodes,
    getActivationCode,
    addActivationCode,
    validateActivationCode,
    deleteAllActivationCodes } = require("../models/activation-code.model")


async function httpGetAllActivationCodes(req, res){
    return res.status(200).json(await getActivationCodes()) 
}

async function httpGetActivationCode(req, res){
    return res.status(200).json(await getActivationCode(req.params.code)) 
}

async function httpAddActivationCode(req, res){
 
    const registrationPayload = {
        activation_code: req.body.activation_code,
        available:true
    }    

    const response = await addActivationCode(registrationPayload)

    return res.status(response.code).json(response.message)
}

async function httpValidateActivationCode(req, res){
    return res.status(201).json(await validateActivationCode(req.body.activation_code))
}

async function httpDeleteAllActivationCodes(req, res){
    return res.status(201).json(await deleteAllActivationCodes())
}


module.exports = {httpValidateActivationCode, httpAddActivationCode, httpGetAllActivationCodes, httpGetActivationCode, httpDeleteAllActivationCodes}