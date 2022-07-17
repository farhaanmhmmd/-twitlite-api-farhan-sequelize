const express = require("express");
const app = express();
const port = 2105;
const bearerToken = require("express-bearer-token");
require("./config/database");

app.use(bearerToken());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((error, req, res, next) => {
  console.log({error});

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = error.code ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({err: error.message});
  console.log(`API successfully running in ${port}`);
});
