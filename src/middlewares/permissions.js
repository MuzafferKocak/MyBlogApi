"use strict";

const Blog = require("../models/blog");
const { ForbiddenError } = require("../errors/customError");

/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

//* Permissions
module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new ForbiddenError("You must log in");
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new ForbiddenError("You must log in and be an Admin");
    }
  },

  isStaff: (req, res, next) => {
    if (req.user && req.user.isStaff) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new ForbiddenError("You must log in and be a Staff");
    }
  },

  isOwner: async (req, res, next) => {
    const { user } = req;
    const blogId = req.params.id; //* blog ID
    // console.log(user);

    try {
      const blog = await Blog.findById(blogId); //* Blog

      if (!blog) {
        return res.status(404).send("Blog not found");
      }

      //* Blog owner
      if (user.isAdmin || blog.userId.toString() === user._id.toString()) {
        return next()
      }
      return res.status(403).send("You are not the owner of this blog");

    
    } catch (err) {
      res.status(500).send("Error checking ownership: " + err.message);
    }
  },
};
