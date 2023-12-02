const {
  createStudent,
  getAllStudents,
  getStudentById,
} = require("../services/studentService");
const {
  createStudentValidator,
} = require("../utils/validators/studentValidator");

const router = require("express").Router();

router.get("/", getAllStudents);
router.post("/new", createStudentValidator, createStudent);

router.get("/:id", getStudentById);
// router.put("/:id", updateSpeciality);
// router.delete("/:id", deleteSpeciality);
module.exports = router;
