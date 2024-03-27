const jwt = require('jsonwebtoken');

const Permissions = require('../models/permissions');

// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'You did not provide a valid token' });
    const decoded = jwt.verify(token, 'your-secret-key');
    const userRole = decoded.role; 

    
    const userPermissions = new Permissions().getPermissionsByRoleName(userRole)

    
    if (userPermissions.includes(permission)) {
      
      let allowProceed = true


      if(permission == 'register_user'){
        allowProceed = false
      }
      
      if(permission == 'register_user' && req.body.role == 'student'){
        allowProceed = true
      }
      if(permission == 'register_user' && req.body.role == 'instructor' && userRole == 'gym-admin'){
        allowProceed = true
      }

      if(allowProceed){
        return next();
      }
      
      else {
        return res.status(403).json({ error: 'Access denied' });
      }
      
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};


// function checkUserLogged(req){
    
//     try {
//         const token = req.header('Authorization');
//         if (!token) return false
//         const decoded = jwt.verify(token, 'your-secret-key');
//         req.userId = decoded.userId; 
//         return true
//     } catch (error) {
//         return false
//     }
// }

// function checkPermissions(permissionsList, req, res, next) {
//     const userIsLogged = checkUserLogged(req)
//     if (!userIsLogged){
//         return {
//             code: 400,
//             msg: "User is not logged"
//         }
//     }


// };

// module.exports = checkPermissions;