const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const connectDB = require("./config/connectDB");
const { errorHandler } = require("./middleware/errorHandler");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOption = {
  origin: ["http://localohost:3000", "http://localhost:8000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting with database: ${error}`);
  });
