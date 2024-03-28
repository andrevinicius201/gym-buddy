const jwt = require('jsonwebtoken');
const { getStudentById } = require('../models/students.model')

const Permissions = require('../models/permissions');

// Only executed for user registration requests
function userRegistrationAdditionalChecks(permission, decoded, userRole, req){
  //debugger
  if(userRole == "instructor" && req.body.role != "student"){
    //debugger
    return false
  }
  //debugger
  return true
}

// Only executed for user training update requests
async function userTrainingUpdateAdditionalChecks(permission, decoded, userRole, req){

  // debugger

  if(userRole != "student"){
    //debugger
    return true
  }

  //debugger

  const studentToBeUpdated = await getStudentById(req.params.studentId)
  if(studentToBeUpdated && decoded.subject == studentToBeUpdated.name){
      ////debugger
      return true
  }

  //debugger
  return false
}

async function executeAdditionalChecks(permission, decoded, userRole, req){
  const additionalValidationMapping = {
    register_user: {
      function: userRegistrationAdditionalChecks
    },
    update_user_training: {
      function: userTrainingUpdateAdditionalChecks
    }
  }

  if(additionalValidationMapping.hasOwnProperty(permission)){
    //debugger
    let expectedValidationFunction = additionalValidationMapping[permission].function
    //debugger
    let successOnCheck = await expectedValidationFunction(permission, decoded, userRole, req)
    // debugger
    return successOnCheck
  } else {
    //debugger
    return true
  }

}

// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
  return async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'You did not provide a valid token' });

    const decoded = jwt.verify(token, 'your-secret-key');
    const userRole = decoded.role; 
    // Use this debugger to manipulate the requester role and run tests
    // debugger
    const userRolePermissions = new Permissions().getPermissionsByRoleName(userRole)

    if(userRolePermissions.includes(permission)){
      let additionalCheckSuccess = await executeAdditionalChecks(permission, decoded, userRole, req)
      // debugger
      return additionalCheckSuccess ? next() : res.status(403).json({ error: 'Access denied' })
    } else {
      return res.status(403).json({ error: 'Access denied' })
    } 

  };
};
