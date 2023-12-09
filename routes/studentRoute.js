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
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = require("express").Router();
router.use(verifyUser);

router.get("/", getAllStudents);
router.post("/new", verifyUserAndAdmin, createStudentValidator, createStudent);

router.get("/:id", getStudentById);
router.put("/:id", verifyUserAndAdmin, updateStudentValidator, updateStudent);
router.delete("/:id", verifyUserAndAdmin, deleteStudent);
module.exports = router;
