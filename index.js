"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const express = require("express");
const app = express();
const cors = require("cors");

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
dbConnection();
/* ------------------------------------------------------- */

//*Middlewares:
// const corsConfig = {
//   origin: 'https://my-blog-api-alpha.vercel.app',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE']
// }
// app.use(cors(corsConfig))
// app.options("", cors(corsConfig))

// app.use(
//   cors({
//     origin: "https://my-blog-api-alpha.vercel.app",
//   }
// )
// );

app.use(
  cors({
    origin: "https://blog-app-murex-two.vercel.app/",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.options("*", cors());

//* Accept JSON
app.use(express.json());

//* Static UloadFile:

//* Check Authentication:
app.use(require("./src/middlewares/authentication"));

//* Logger:
// app.use(require("./src/middlewares/logger"));

//*queryHandler
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
//* Routes:

//*Home Path
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to My Blog API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});
//*Routes
app.use(require("./src/routes"));

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
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
//* Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
