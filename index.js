"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
//* Required Modules:

//* envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

//* asyncErrors to errorHandler:
require("express-async-errors");
/* ------------------------------------------------------- */

//*Configrations:

//*Connect to DB
const { dbConnection } = require("./src/configs/dbConnection");

/* ------------------------------------------------------- */

//*Middlewares:

//* Accept JSON
app.use(express.json());


//*queryHandler
app.use(require("./src/middlewares/queryHandler"))

/* ------------------------------------------------------- */
//* Routes:

//*Home Path
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to My Blog API",
  });
});
//*Routes
// app.use(require("./src/routes"))

//* Not Founds
app.all("*", (req, res) => {
  res.status(400).send({
    error: true,
    message: "Route is not found",
  });
});



//* errorHandler:
app.use(require("./src/middlewares/errorHandler"));

//* RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));