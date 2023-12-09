const express = require("express");
const {
  createSemester,
  getAllSemesters,
  getSemesterByid,
  updateSemester,
  deleteSemester,
} = require("../services/semesterService");
const {
  createSemesterValidator,
  updateSemesterValidator,
} = require("../utils/validators/semesterValidator");
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = express.Router();
router.use(verifyUser);

router.get("/", getAllSemesters);
router.post("/", verifyUserAndAdmin, createSemesterValidator, createSemester);
router.get("/:id", getSemesterByid);
router.put("/:id", verifyUserAndAdmin, updateSemesterValidator, updateSemester);
router.delete("/:id", verifyUserAndAdmin, deleteSemester);

module.exports = router;
