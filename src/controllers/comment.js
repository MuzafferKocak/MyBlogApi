"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const Comment = require("../models/comment");
const Blog = require("../models/blog");

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

    const data = await res.getModelList(Comment, {}, [
      { path: "userId", select: "username email" },
      { path: "blogId", select: "name" },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Comment),
      data,
    });
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

    const { blogId, userId, comment } = req.body;
    
    const data = await Comment.create({
      blogId,
      userId,
      comment,
    });

    await Blog.findByIdAndUpdate(blogId, { $push: { comments: data._id } }),
      res.status(201).send({
        error: false,
        new: await Blog.findOne({_id: blogId}).populate([
          { path: "userId", select: "username email" },
          { path: "categoryId", select: "name" },
          { path: "comments", select: "comment createdAt" },
        ]),
        data,
      });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Get Single Comment"
    */

    const data = await Comment.findOne({ _id: req.params.id }).populate([
      { path: "userId", select: "username email" },
      { path: "blogId", select: "name" },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
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

    const data = await Comment.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      new: await Comment.findOne({ _id: req.params.id }),
      data,
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Delete Comment"
    */

    const data = await Comment.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: "Something went wrong, data possibly deleted.",
    });
  },
};
