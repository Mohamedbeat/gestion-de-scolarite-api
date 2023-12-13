const {
  getAllSpecialities,
  createSpeciality,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
} = require("../services/specialityService");
const {
  createSpecialityValidator,
  updateSpecialityValidator,
} = require("../utils/validators/specialityValidator");
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = require("express").Router();
router.use(verifyUser);

router.get("/", getAllSpecialities);
router.post(
  "/new",
  verifyUserAndAdmin,
  createSpecialityValidator,
  createSpeciality
);

router.get("/:id", getSpecialityById);
router.put(
  "/:id",
  verifyUserAndAdmin,
  updateSpecialityValidator,
  updateSpeciality
);
router.delete("/:id", verifyUserAndAdmin, deleteSpeciality);
module.exports = router;
