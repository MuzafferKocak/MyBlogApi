"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const Comment = require("../models/comment");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "List Comment"
        #swagger.description = `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Create Comment"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Comment'
            }
        }
    */
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Get Single Comment"
    */
  },
  update: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Update Comment"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
             schema: {
                $ref: '#/definitions/Comment'
            }
        }
    */
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Delete Comment"
    */
  },
};
