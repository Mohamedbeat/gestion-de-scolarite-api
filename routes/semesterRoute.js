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

const router = express.Router();

router.get("/", getAllSemesters);
router.post("/", createSemesterValidator, createSemester);
router.get("/:id", getSemesterByid);
router.put("/:id", updateSemesterValidator, updateSemester);
router.delete("/:id", deleteSemester);

module.exports = router;
