"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

//* app.use(errorHandler):

module.exports = (err, req, res, next) => {
  //* Volle Details nur ins Server-Log (z. B. Vercel-Logs), nicht an den Browser
  console.log(err);

  //* Kein stack (verrät Dateipfade/Code) und kein body (kann Passwörter enthalten)
  return res.status(res?.errorStatusCode || 500).send({
    error: true,
    message: err.message,
  });
};
