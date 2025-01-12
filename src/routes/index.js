"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */

//* Routes

//* auth
//* user
//* token

//* blogs
router.use("/blogs", require("./blog"))

//*categories
router.use("/categories", require("./category"))

//* comments
// router.use("/comments", require("./comment"))



//*document
router.use("/documents", require("./document"))




/* ------------------------------------------------------- */
module.exports = router;