"use strict";

const { ForbiddenError } = require("../errors/customError");

/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

//* Permissions
module.exports = {

    isLogin: (req, res, next)=>{
        if(req.user){
            next()
        }else{
            res.errorStatusCode = 403
            throw new ForbiddenError("You must log in")
        }
    
    },

    isAdmin: (req,res, next)=>{
        if(req.user && req.user.isAdmin){
            next()
        }else{
            res.errorStatusCode = 403
            throw new ForbiddenError("You must log in and be an Admin")
        }

    },

    isStaff: (req,res, next)=>{
        if (req.user && req.user.isStaff) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new ForbiddenError("You must log in and be a Staff");
        }

    },
}