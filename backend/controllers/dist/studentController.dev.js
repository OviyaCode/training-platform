"use strict";

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

var asyncHandler = require("express-async-handler");

var Student = require("../models/StudentModel");

var Course = require("../models/CourseModel");

var login = asyncHandler(function _callee(req, res) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(Student.findOne({
            email: email
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          res.status(400);
          throw new Error("User doesn't exist");

        case 7:
          _context.t0 = user;

          if (!_context.t0) {
            _context.next = 12;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          _context.t0 = _context.sent;

        case 12:
          if (!_context.t0) {
            _context.next = 16;
            break;
          }

          res.status(200).json({
            message: "Successfully logged in",
            token: generateJWT(user.id),
            name: user.name,
            userId: user.id,
            email: user.email
          });
          _context.next = 18;
          break;

        case 16:
          res.status(400);
          throw new Error("Invalid credentials");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
});
var createStudent = asyncHandler(function _callee2(req, res) {
  var _req$body2, name, email, trainingOption, password, studentExist, salt, hashedPassword, student;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, trainingOption = _req$body2.trainingOption, password = _req$body2.password;

          if (!(!name || !email)) {
            _context2.next = 4;
            break;
          }

          res.status(400);
          throw new Error("Please fill all fields");

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(Student.findOne({
            email: email
          }));

        case 6:
          studentExist = _context2.sent;

          if (!studentExist) {
            _context2.next = 10;
            break;
          }

          res.status(400);
          throw new Error("Student already exist");

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 12:
          salt = _context2.sent;
          _context2.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 15:
          hashedPassword = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(Student.create({
            name: name,
            email: email,
            trainingOption: trainingOption,
            password: hashedPassword
          }));

        case 18:
          student = _context2.sent;

          if (!student) {
            _context2.next = 23;
            break;
          }

          res.status(200).json({
            _id: student.id,
            name: student.name,
            email: student.email,
            trainingOptions: student.trainingOption
          });
          _context2.next = 25;
          break;

        case 23:
          res.status(400);
          throw new Error("Internal server error");

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getStudents = asyncHandler(function _callee3(req, res) {
  var students;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Student.find().select("-password"));

        case 2:
          students = _context3.sent;
          res.status(200).json(students);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var updateStudent = asyncHandler(function _callee4(req, res) {
  var student, salt, hashedPassword, updatedStudent;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Student.findById(req.params.id));

        case 2:
          student = _context4.sent;

          if (student) {
            _context4.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Student not found");

        case 6:
          if (!req.body.password) {
            _context4.next = 14;
            break;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 12:
          hashedPassword = _context4.sent;
          req.body.password = hashedPassword;

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(Student.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 16:
          updatedStudent = _context4.sent;
          res.status(200).json({
            message: "Student updated successfully with id ".concat(req.params.id),
            updatedStudent: updatedStudent
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var getStudent = asyncHandler(function _callee5(req, res) {
  var student;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Student.findById(req.params.id));

        case 2:
          student = _context5.sent;

          if (student) {
            _context5.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Student not found");

        case 6:
          res.status(200).json(student);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var enrollCourse = asyncHandler(function _callee6(req, res) {
  var _req$body3, option, courseId, student;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, option = _req$body3.option, courseId = _req$body3.courseId; // Validate option type

          if (["add", "remove"].includes(option)) {
            _context6.next = 4;
            break;
          }

          res.status(400);
          throw new Error("Invalid option. Use 'add' or 'remove'.");

        case 4:
          _context6.next = 6;
          return regeneratorRuntime.awrap(Student.findById(req.params.id));

        case 6:
          student = _context6.sent;

          if (student) {
            _context6.next = 10;
            break;
          }

          res.status(400);
          throw new Error("Student not found");

        case 10:
          if (!(option === "add")) {
            _context6.next = 18;
            break;
          }

          if (!(student.courseId && student.courseId.toString() === courseId)) {
            _context6.next = 14;
            break;
          }

          res.status(400);
          throw new Error("Course already added to student's training options");

        case 14:
          student.trainingOption = option;
          student.courseId = courseId;
          _context6.next = 24;
          break;

        case 18:
          if (!(option === "remove")) {
            _context6.next = 24;
            break;
          }

          if (!(student.courseId && student.courseId.toString() !== courseId)) {
            _context6.next = 22;
            break;
          }

          res.status(400);
          throw new Error("Course not found in student's training options");

        case 22:
          student.trainingOption = option;
          student.courseId = null;

        case 24:
          _context6.next = 26;
          return regeneratorRuntime.awrap(student.save());

        case 26:
          res.status(200).json(student);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var deleteStudent = asyncHandler(function _callee7(req, res) {
  var student;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Student.findById(req.params.id));

        case 2:
          student = _context7.sent;

          if (student) {
            _context7.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Student not found");

        case 6:
          _context7.next = 8;
          return regeneratorRuntime.awrap(student.deleteOne());

        case 8:
          res.status(200).json({
            message: "Student deleted ".concat(req.params.id)
          });

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  });
});

var generateJWT = function generateJWT(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

module.exports = {
  login: login,
  createStudent: createStudent,
  updateStudent: updateStudent,
  getStudents: getStudents,
  getStudent: getStudent,
  enrollCourse: enrollCourse,
  deleteStudent: deleteStudent
};