const express = require("express");
const app = express();
const port = 2104;
const bearerToken = require("express-bearer-token");

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
