"use strict";

var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter password"]
  },
  trainingOption: {
    type: String,
    "enum": ["add", "remove"]
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("Student", studentSchema);