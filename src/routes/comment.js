"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const comment = require("../controllers/comment");
const {isLogin, isAdmin}= require("../middlewares/permissions")
/* ------------------------------------------------------- */

router.route("/").get(comment.list).post(isLogin, comment.create);

router
  .route("/:id")
  .get(comment.read)
  .put(isAdmin, comment.update)
  .patch(isAdmin, comment.update)
  .delete(isAdmin, comment.delete);
/* ------------------------------------------------------- */
module.exports = router