
const { validateCode, invalidateCode } = require("../models/access-code.model")

async function httpValidateCode(activation_code){
    return await validateCode(activation_code)
}

async function httpInvalidateCode(activation_code){
    const invalidation = await invalidateCode(activation_code)
    console.log(invalidation)
    return 
}

module.exports = {httpValidateCode, httpInvalidateCode}