"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
const user = require("../controllers/user");
const { isLogin, isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

router.route("/").get(isAdmin, user.list).post(user.create);

router
  .route("/:id")
  .get(isAdmin, user.read)
  .put(isLogin, user.update)
  .patch(isLogin, user.update)
  .delete(isAdmin, user.delete);
/* ------------------------------------------------------- */
module.exports = router;
