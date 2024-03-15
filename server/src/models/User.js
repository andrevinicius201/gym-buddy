users = new Map()

function registerUser(userData){
    users.set(userData.email, userData)
    return userData
}


function getUser(email){
    const response = users.get(email)
    return response
}


function getAllUsers(){
    return Array.from(users.values())
}

module.exports = {
    registerUser,
    getUser,
    getAllUsers
}

module.exports.init = function(){
    console.log(Array.from(users.values()));
}