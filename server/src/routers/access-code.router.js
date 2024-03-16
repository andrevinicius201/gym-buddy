
const {httpValidateCode} = require("../controllers/activation-code.controller")
const express = require("express")
const accessCodeRouter = express.Router()

accessCodeRouter.post("/validate", httpValidateCode)


module.exports = accessCodeRouter