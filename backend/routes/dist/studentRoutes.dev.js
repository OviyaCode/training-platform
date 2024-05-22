"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../middleware/authMiddleware"),
    protect = _require.protect;

var _require2 = require("../controllers/studentController"),
    login = _require2.login,
    createStudent = _require2.createStudent,
    updateStudent = _require2.updateStudent,
    deleteStudent = _require2.deleteStudent,
    getStudents = _require2.getStudents,
    getStudent = _require2.getStudent,
    enrollCourse = _require2.enrollCourse;

router.get("/", protect, getStudents);
router.get("/:id", protect, getStudent);
router.post("/login", login);
router.post("/register", createStudent);
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.put("/:id/enroll", protect, enrollCourse);
router["delete"]("/:id", protect, deleteStudent);
module.exports = router;