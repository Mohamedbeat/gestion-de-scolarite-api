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
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = express.Router();

router.use(verifyUser);
router.get("/", getAllmarksValidator, getAllMarks);
router.get("/single", getOneMarkValidator, getOneMark);
router.delete("/", verifyUserAndAdmin, getOneMarkValidator, deleteMark);
router.post("/new", verifyUserAndAdmin, createMarkMiddlewere, createMark);
router.put("/", verifyUserAndAdmin, updateMarkMiddlewere, updateMark);

module.exports = router;
