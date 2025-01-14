"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "password": "1234",
            }
        }
    */
    try {
      const { username, password, email } = req.body;

      if (!(username || email) && password) {
        return res.status(400).send({
          error: true,
          message: "Please enter username or email and password.",
        });
      }

      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user || user.password !== passwordEncrypt(password)) {
        return res.status(401).send({
          error: true,
          message: "Wrong username or password.",
        });
      }

      if (!user.isActive) {
        return res.status(403).send({
          error: true,
          message: "User is inactive.",
        });
      }

      //* Simple Token
      let tokenData = await Token.findOne({ userId: user._id });

      if (!tokenData) {
        const tokenKey = passwordEncrypt(user._id + Date.now());
        tokenData = await Token.create({
          userId: user._id,
          token: tokenKey,
        });
      }

      //* JWT Access Token
      const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.ACCESS_KEY,
        { expiresIn: "30m" }
      );

      //* JWT Refresh Token
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_KEY, {
        expiresIn: "3d",
      });

      res.status(200).send({
        error: false,
        token: tokenData?.token || null,
        bearer: {
          access: accessToken,
          refresh: refreshToken,
        },
        user,
      });
    } catch {
      res.status(500).send({
        error: true,
        message: error.message || "An unexpected error occurred.",
      });
    }
  },
  refresh: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'JWT: Refresh'
        #swagger.description = 'Refresh accessToken with refreshToken'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                bearer: {
                    refresh: '...refreshToken...'
                }
            }
        }
    */
    try {
      const refreshToken = req.body?.bearer?.refresh;

      if (!refreshToken) {
        return res.status(400).send({
          error: true,
          message: "Refresh token is required.",
        });
      }

      const jwtData = jwt.verify(refreshToken, process.env.REFRESH_KEY);

      const { id, password } = jwtData;

      if (!id || !password) {
        return res.status(401).send({
          error: true,
          message: "Invalid token payload.",
        });
      }

      const user = await User.findOne({ _id: id });

      if (!user || user.password !== password) {
        return res.status(401).send({
          error: true,
          message: "Invalid user credentials.",
        });
      }

      if (!user.isActive) {
        return res.status(403).send({
          error: true,
          message: "This account is not active.",
        });
      }

      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
        expiresIn: "30m",
      });

      return res.status(200).send({
        error: false,
        bearer: {
          access: accessToken,
        },
      });
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: error.message || "An unexpected error occurred.",
      });
    }
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "SimpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    const tokenData = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Logout was OK",
      data: tokenData,
    });
  },
};
