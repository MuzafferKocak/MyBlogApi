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
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
    */
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
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
    */
  },
};
