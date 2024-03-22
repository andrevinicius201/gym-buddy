
const {httpValidateCode, httpAddRegistrationCode, httpGetAllRegistrationCodes, httpGetRegistrationCode} = require("../controllers/activation-code.controller")
const express = require("express")
const accessCodeRouter = express.Router()

accessCodeRouter.get("/", httpGetAllRegistrationCodes)
accessCodeRouter.get("/:code", httpGetRegistrationCode)
accessCodeRouter.post("/validate", httpValidateCode)
accessCodeRouter.post("/", httpAddRegistrationCode)


module.exports = accessCodeRouter