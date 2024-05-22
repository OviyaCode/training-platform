const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/StudentModel");
const Course = require("../models/CourseModel");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await Student.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: `Successfully logged in`,
      token: generateJWT(user.id),
      name: user.name,
      userId: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, trainingOption, password } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const studentExist = await Student.findOne({ email });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const student = await Student.create({
    name,
    email,
    trainingOption,
    password: hashedPassword,
  });

  if (student) {
    res.status(200).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      trainingOptions: student.trainingOption,
    });
  } else {
    res.status(400);
    throw new Error("Internal server error");
  }
});
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().select("-password");
  res.status(200).json(students);
});
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `Student updated successfully with id ${req.params.id}`,
    updatedStudent,
  });
});
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }

  res.status(200).json(student);
});
const enrollCourse = asyncHandler(async (req, res) => {
  const { option, courseId } = req.body;

  // Validate option type
  if (!["add", "remove"].includes(option)) {
    res.status(400);
    throw new Error("Invalid option. Use 'add' or 'remove'.");
  }

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }

  // const course = await

  if (option === "add") {
    if (student.courseId && student.courseId.toString() === courseId) {
      res.status(400);
      throw new Error("Course already added to student's training options");
    }
    student.trainingOption = option;
    student.courseId = courseId;
  } else if (option === "remove") {
    if (student.courseId && student.courseId.toString() !== courseId) {
      res.status(400);
      throw new Error("Course not found in student's training options");
    }
    student.trainingOption = option;
    student.courseId = null;
  }

  await student.save();

  res.status(200).json(student);
});
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  //permanent delete
  await student.deleteOne();
  res.status(200).json({
    message: `Student deleted ${req.params.id}`,
  });
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  login,
  createStudent,
  updateStudent,
  getStudents,
  getStudent,
  enrollCourse,
  deleteStudent,
};
