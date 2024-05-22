const asyncHandler = require("express-async-handler");
const Course = require("../models/CourseModel");

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const courseExist = await Course.findOne({ title });

  if (courseExist) {
    res.status(400);
    throw new Error("Course already exist");
  }
  const course = await Course.create({
    title,
    description,
    duration,
  });

  if (course) {
    res.status(200).json({
      _id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
    });
  } else {
    res.status(400);
    throw new Error("Internal server error");
  }
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
});

const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  res.status(200).json(course);
});
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: `Course updated successfully with id ${req.params.id}`,
    updatedCourse,
  });
});
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  //permanent delete
  await course.deleteOne();
  res.status(200).json({
    message: `Course deleted ${req.params.id}`,
  });
});

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
