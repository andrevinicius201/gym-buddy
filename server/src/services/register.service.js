const StudentModel = require("../models/students.model")

async function register(req, res){
    return res.status(201).json(await StudentModel.addNewStudent(user))
}

module.exports = register