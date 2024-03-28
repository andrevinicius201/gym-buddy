
const express = require("express")
const {httpValidateActivationCode, httpAddActivationCode, httpGetAllActivationCodes, httpGetActivationCode, httpDeleteAllActivationCodes} = require("../controllers/activation-code.controller")
const rbacMiddleware = require('../middleware/rbacMiddleware');

const accessCodeRouter = express.Router()

accessCodeRouter.post("/", 
    // rbacMiddleware.checkPermission('create_activation_code'), 
    httpAddActivationCode
)

accessCodeRouter.get("/", httpGetAllActivationCodes)
accessCodeRouter.get("/:code", httpGetActivationCode)
accessCodeRouter.post("/validate", httpValidateActivationCode)
accessCodeRouter.delete("/", httpDeleteAllActivationCodes)


module.exports = accessCodeRouter