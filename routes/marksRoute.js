const express = require("express");
const {
  createMarkMiddlewere,
  updateMarkMiddlewere,
  getAllmarksValidator,
  getOneMarkValidator,
} = require("../utils/validators/marksValidator");
const {
  createMark,
  updateMark,
  getAllMarks,
  getOneMark,
  deleteMark,
} = require("../services/marksService");

const router = express.Router();

router.get("/", getAllmarksValidator, getAllMarks);
router.get("/single", getOneMarkValidator, getOneMark);
router.delete("/", getOneMarkValidator, deleteMark);
router.post("/new", createMarkMiddlewere, createMark);
router.put("/", updateMarkMiddlewere, updateMark);

module.exports = router;
