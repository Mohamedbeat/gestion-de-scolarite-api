const {
  getAllSections,
  createSection,
  getSectionById,
  getSectionAdvanced,
  updateSection,
  deleteSection,
} = require("../services/sectionService");
const {
  createSectionValidator,
  sectionAdvancedSearchValidation,
  updateSectionValidator,
} = require("../utils/validators/sectionValidator");

const router = require("express").Router();

router.get("/", getAllSections);
router.post("/new", createSectionValidator, createSection);

router.get(
  "/advancedSearch",
  sectionAdvancedSearchValidation,
  getSectionAdvanced
);
router.get("/:id", getSectionById);
router.put("/:id", updateSectionValidator, updateSection);
router.delete("/:id", deleteSection);
module.exports = router;
