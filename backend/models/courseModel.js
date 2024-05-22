const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please enter the course title"],
  },
  description: {
    type: String,
    required: [true, "Please enter the course description"],
  },
  duration: {
    type: Number,
    required: [true, "Please enter the course duration"],
  },
});

module.exports = mongoose.model("Course", courseSchema);
