"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const blog = require("../controllers/blog");
const { isLogin, isOwner } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

router.route("/").get(blog.list).post(isLogin, blog.create);

router
  .route("/:id")
  .get(isLogin, blog.read)
  .put(isLogin, isOwner, blog.update)
  .patch(isLogin, isOwner, blog.update)
  .delete(isLogin, isOwner, blog.delete);

/* ------------------------------------------------------- */

router.post("/:id/like", isLogin, blog.postLike);

/* ------------------------------------------------------- */
module.exports = router;
