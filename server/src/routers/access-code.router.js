
const {httpValidateCode, httpAddRegistrationCode} = require("../controllers/activation-code.controller")
const express = require("express")
const accessCodeRouter = express.Router()

accessCodeRouter.post("/validate", httpValidateCode)
accessCodeRouter.post("/", httpAddRegistrationCode)


module.exports = accessCodeRouter