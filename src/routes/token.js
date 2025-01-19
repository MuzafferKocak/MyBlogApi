"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const token = require("../controllers/token");
const {isAdmin, isLogin}= require("../middlewares/permissions")
/* ------------------------------------------------------- */

router.route("/").get(isAdmin, token.list).post(isLogin, token.create);

router
  .route("/:id")
  .get(isAdmin, token.read)
  .put(isLogin, token.update)
  .patch(isLogin, token.update)
  .delete(isLogin, token.delete);

/* ------------------------------------------------------- */
module.exports = router;
