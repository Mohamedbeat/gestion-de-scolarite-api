const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../services/studentService");
const {
  createStudentValidator,
  updateStudentValidator,
} = require("../utils/validators/studentValidator");

const router = require("express").Router();

router.get("/", getAllStudents);
router.post("/new", createStudentValidator, createStudent);

router.get("/:id", getStudentById);
router.put("/:id", updateStudentValidator, updateStudent);
router.delete("/:id", deleteStudent);
module.exports = router;
