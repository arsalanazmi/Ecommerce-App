const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route Imports
const product = require("./routes/productRoute");
app.use("/api/v1", product);

// Middleware For Errors
app.use(errorMiddleware);

module.exports = app;