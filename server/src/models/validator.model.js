const bcrypt = require("bcrypt")
const code_service = require("./access-code.model")

async function checkUserData(user) {
    
    if(user.role != "gym-admin"){
        return true
    } 

    const codeIsAvailable = await code_service.validateCode(user.access_code)
    return codeIsAvailable ? true : false
    
}



module.exports = {
    checkUserData,
}
