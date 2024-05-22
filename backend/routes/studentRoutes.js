const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  login,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  getStudent,
  enrollCourse,
} = require("../controllers/studentController");

router.get("/", protect, getStudents);
router.get("/:id", protect, getStudent);
router.post("/login", login);
router.post("/register", createStudent);
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.put("/:id/enroll", protect, enrollCourse);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
