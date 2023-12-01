const {
  getAllSpecialities,
  createSpeciality,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
} = require("../services/specialityService");
const {
  createSpecialityValidator,
} = require("../utils/validators/specialityValidator");

const router = require("express").Router();

router.get("/", getAllSpecialities);
router.post("/new", createSpecialityValidator, createSpeciality);

router.get("/:id", getSpecialityById);
router.put("/:id", updateSpeciality);
router.delete("/:id", deleteSpeciality);
module.exports = router;
