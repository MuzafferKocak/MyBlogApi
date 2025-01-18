"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

//* app.use(authentication):

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      //*simpleToken
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );

      req.user = tokenData ? tokenData.userId : undefined;
      return next()

    } else if (tokenKey[0] == "Bearer") {
      //*JWT
      jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, data) => {
        if (error) {
          return res.status(403).json({ message: "Invalid token" });
        }
        req.user = data;
        next()
      });
      return
    }
  }

  next();
};
