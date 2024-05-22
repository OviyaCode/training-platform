"use strict";

var asyncHandler = require("express-async-handler");

var Course = require("../models/CourseModel");

var createCourse = asyncHandler(function _callee(req, res) {
  var _req$body, title, description, duration, courseExist, course;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, duration = _req$body.duration;

          if (!(!title || !description || !duration)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error("Please fill all fields");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Course.findOne({
            title: title
          }));

        case 6:
          courseExist = _context.sent;

          if (!courseExist) {
            _context.next = 10;
            break;
          }

          res.status(400);
          throw new Error("Course already exist");

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(Course.create({
            title: title,
            description: description,
            duration: duration
          }));

        case 12:
          course = _context.sent;

          if (!course) {
            _context.next = 17;
            break;
          }

          res.status(200).json({
            _id: course.id,
            title: course.title,
            description: course.description,
            duration: course.duration
          });
          _context.next = 19;
          break;

        case 17:
          res.status(400);
          throw new Error("Internal server error");

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getCourses = asyncHandler(function _callee2(req, res) {
  var courses;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Course.find());

        case 2:
          courses = _context2.sent;
          res.status(200).json(courses);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getCourse = asyncHandler(function _callee3(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context3.sent;

          if (course) {
            _context3.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Course not found");

        case 6:
          res.status(200).json(course);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var updateCourse = asyncHandler(function _callee4(req, res) {
  var course, updatedCourse;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context4.sent;

          if (course) {
            _context4.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Course not found");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Course.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 8:
          updatedCourse = _context4.sent;
          res.status(200).json({
            message: "Course updated successfully with id ".concat(req.params.id),
            updatedCourse: updatedCourse
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteCourse = asyncHandler(function _callee5(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context5.sent;

          if (course) {
            _context5.next = 6;
            break;
          }

          res.status(400);
          throw new Error("Course not found");

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(course.deleteOne());

        case 8:
          res.status(200).json({
            message: "Course deleted ".concat(req.params.id)
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  createCourse: createCourse,
  getCourses: getCourses,
  getCourse: getCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse
};