"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "List Blog"
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

    const data = await res.getModelList(Blog, {}, [
      { path: "userId", select: "username email" },
      { path: "categoryId", select: "name" },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog),
      data,
    });
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Blog'
            }
        }
    */

    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
    */

    const data = await Blog.findOne({ _id: req.params.id }).populate([
      { path: "userId", select: "username email" },
      { path: "categoryId", select: "name" },
      { path: "comments", select: "comment createdAt " },
    ]);

    data.countOfVisitors += 1
    await data.save()

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Update Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
             schema: {
                $ref: '#/definitions/Blog'
            }
        }
    */

    const data = await Blog.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      new: await Blog.findOne({ _id: req.params.id }),
      data,
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete Blog"
    */

    const data = await Blog.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: "Something went wrong, data possibly deleted.",
    });
  },

  //* Blog Like
  like: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Like Blog"
        
    */
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({ error: true, message: "Blog not found" });
      }

      
      blog.likes = (parseInt(blog.likes) + 1).toString(); 
      await blog.save();

      res.status(200).send({
        error: false,
        message: "Blog liked successfully",
        blog,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Something went wrong while liking the blog",
      });
    }
  },

  //* Blog UnLike 
  unlike: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "UnLike Blog"
        
    */
    try {
      const blog = await Blog.findById(req.params.id); 
      if (!blog) {
        return res.status(404).send({ error: true, message: "Blog not found" });
      }

      
      const newLikeCount = Math.max(0, parseInt(blog.likes) - 1); 
      blog.likes = newLikeCount.toString(); 

      res.status(200).send({
        error: false,
        message: "Blog unliked successfully",
        blog,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Something went wrong while unliking the blog",
      });
    }
  },
  // postLike: async (req, res) => {
  //   // console.log(req.user) buradan username'e erişebilirim.
  //   const blog = await Blog.findOne({ _id: req.params.id });
  //   // console.log(blog); buradan mevcut blog bilgilerine ulaşabiliyorum
  //   const likeIndex = blog.likes.findIndex(
  //     (like) => like.username === req.user.username
  //   );
  //   if (likeIndex === -1) {
  //     blog.likes.push({ username: req.user.username });
  //   } else {
  //     blog.likes.splice(likeIndex, 1);
  //   }
  //   await blog.save();
  //   res.status(200).send({
  //     error: false,
  //     data: await Blog.findOne({ _id: req.params.id }),
  //   });
  // },
};
