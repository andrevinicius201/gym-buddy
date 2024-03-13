users = new Map()

function registerUser(userData){
    users.set(userData.username, userData)
    return userData
}


function getUser(userName){
    const response = users.get(userName)
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