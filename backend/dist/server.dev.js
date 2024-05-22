"use strict";

var express = require("express");

var cors = require("cors");

var dotenv = require("dotenv").config();

var port = process.env.PORT || 5000;
var app = express();

var connectDB = require("./config/connectDB");

var _require = require("./middleware/errorHandler"),
    errorHandler = _require.errorHandler;

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var corsOption = {
  origin: ["http://localohost:3000", "http://localhost:8000"],
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));
app.options("*", cors());
app.get("/", function (req, res) {
  res.send("Hello world!");
});
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use(errorHandler);
connectDB().then(function () {
  app.listen(port, function () {
    console.log("Server started on port ".concat(port));
  });
})["catch"](function (error) {
  console.error("Error connecting with database: ".concat(error));
});