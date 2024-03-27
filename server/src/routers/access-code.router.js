
const {httpValidateActivationCode, httpAddActivationCode, httpGetAllActivationCodes, httpGetActivationCode, httpDeleteAllActivationCodes} = require("../controllers/activation-code.controller")
const express = require("express")
const accessCodeRouter = express.Router()

accessCodeRouter.get("/", httpGetAllActivationCodes)
accessCodeRouter.get("/:code", httpGetActivationCode)
accessCodeRouter.post("/validate", httpValidateActivationCode)
accessCodeRouter.post("/", httpAddActivationCode)
accessCodeRouter.delete("/", httpDeleteAllActivationCodes)


module.exports = accessCodeRouter