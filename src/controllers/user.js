"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "List Users"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "username": "test",
                "password": "1234",
                "email": "test@site.com",
                "isActive": true,
                "isStaff": false,
                "isAdmin": false,
            }
        }
    */
    /*
        req.body.isStaff=false
        req.body.isAdmin=false
    */

    try {
      const data = await User.create(req.body);

      //*Auth Login
      //*Simple Token
      const tokenData = await token.create({
        userId: data._id,
        token: passwordEncrypt(data._id + Date.now()),
      });

      //*JWT
      const accessToken = jwt.sign(data.toJSON(), process.env.ACCESS_KEY, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(
        { _id: data._id, password: data.password },
        process.env.REFRESH_KEY,
        { expiresIn: "3d" }
      );

      //*Mail
      // await sendWelcomeEmail(data.email, data.username);

      res.status(201).send({
        error: false,
        token: tokenData.token,
        bearer: {
          access: accessToken,
          refresh: refreshToken,
        },
        data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Email sending failed",
        details: error.message,
      });
    }
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
    */

    const id = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findOne({ _id: id });

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "username": "test",
                "password": "1234",
                "email": "test@site.com",
                "isActive": true,
                "isStaff": false,
                "isAdmin": false,
            }
        }
    */

    if (!req.user.isAdmin) req.params.id = req.user._id;
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
    */

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: "Something went wrong, data possibly deleted.",
      data,
    });
  },
};
