import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req,res,next)=>{
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(createError(401, "You are not authenticated,your token is missing"));
  }
  const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,'token is not vaild')) 
        }
        console.log("user data extracted by token",user.id,user.role);
        req.user = {
            id: user.id,
            role: user.role, 
        };
        next()
    })
}


export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {      
      if (req.user && req.user.role === "Admin") {
          next();
      } else {
          return next(createError(403, 'You are not an admin to perform this operation.'));
      }
  });
};



export const verifyOfficeStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.role === "Office Staff" || req.user.role === "Admin")) {
      next(); 
    } else {
      return next(
        createError(403, 'You are not authorized to perform this operation.')
      );
    }
  });
}


  export const verifyLibrarian = (req, res, next) => {
    verifyToken(req, res, () => {
      if (
        req.user &&
        (req.user.role === "Librarian" || req.user.role === "Office Staff" || req.user.role === "Admin")
      ) {
        console.log("success");
        
        next();
      } else {
        return next(createError(403, 'You are not authorized to perform this operation.'));
      }
    });
  }
  

  
