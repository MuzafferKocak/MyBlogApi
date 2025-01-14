"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/



const router = require("express").Router();
const auth = require("../controllers/auth")
/* ------------------------------------------------------- */


//* Auth:

router.post("/login", auth.login)
router.post("/refresh", auth.refresh)
router.get("/logout", auth.logout)

/* ------------------------------------------------------- */
module.exports = router;