"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const blog = require("../controllers/blog");

/* ------------------------------------------------------- */

router.route("/").get(blog.list).post(blog.create);

router
  .route("/:id")
  .get(blog.read)
  .put(blog.update)
  .patch(blog.update)
  .delete(blog.delete);

  
  /* ------------------------------------------------------- */
  // router.route("/:id/postLike").post(blog.postLike);
router.patch("/:id/like", blog.like);
router.patch("/:id/unlike", blog.unlike);
/* ------------------------------------------------------- */
module.exports = router;
