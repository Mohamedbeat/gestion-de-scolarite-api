const {
  getAllSections,
  createSection,
  getSectionById,
  getSectionAdvanced,
  updateSection,
} = require("../services/sectionService");
const {
  createSectionValidator,
  sectionAdvancedSearchValidation,
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
router.put("/:id", createSectionValidator, updateSection);
// router.delete("/:id", deleteSpeciality);
module.exports = router;
