const code_service = require("./activation-code.model")

async function checkUserData(user) {
    
    if(user.role != "gym-admin"){
        return true
    } 


    const codeIsAvailable = await code_service.validateActivationCode(user.activation_code)
    return codeIsAvailable ? true : false
    
}


module.exports = {
    checkUserData,
}
