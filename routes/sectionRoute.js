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
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = require("express").Router();
router.use(verifyUser);
router.get("/", getAllSections);
router.post("/new", verifyUserAndAdmin, createSectionValidator, createSection);

router.get(
  "/advancedSearch",
  sectionAdvancedSearchValidation,
  getSectionAdvanced
);
router.get("/:id", getSectionById);
router.put("/:id", verifyUserAndAdmin, updateSectionValidator, updateSection);
router.delete("/:id", verifyUserAndAdmin, deleteSection);
module.exports = router;
