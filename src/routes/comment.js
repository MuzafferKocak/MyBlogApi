"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const comment = require("../controllers/comment");
/* ------------------------------------------------------- */

router.route("/").get(comment.list).post(comment.create);

router
  .route("/:id")
  .get(comment.read)
  .put(comment.update)
  .patch(comment.update)
  .delete(comment.delete);
/* ------------------------------------------------------- */
module.exports = router