"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    //   set: (password) => passwordEncrypt(password),
      
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true, 
      index: true,
      
    //   validate: [
    //     (email) => {
    //       const regexEmailCheck =
    //         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //       return regexEmailCheck.test(email);
    //     },
    //     "Email type is not correct.",
    //   ],
    },
    firstName: String,
    lastName: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

//* Pre-save hook for validation and password encryption

UserSchema.pre("save", function (next) {
    
    const data = this?._update ?? this;
  
    //* Email Validation:
    if (data.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        return next(new Error("Email is not valid"));
      }
  
    //* Password Validation:
    if (data.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(data.password)) {
        return next(new Error("Password must be at least 8 characters long, including one uppercase letter and one special character."));
      }
  
    if (data.password) data.password = passwordEncrypt(data.password);
  
    next();
  });

module.exports = mongoose.model("User", UserSchema);
