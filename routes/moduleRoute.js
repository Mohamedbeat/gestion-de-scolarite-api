const express = require("express");
const {
  createModule,
  getAllModules,
  getModuleByid,
  updateModule,
  deleteModule,
} = require("../services/moduleService");
const {
  createModuleValidator,
  updateModuleValidator,
} = require("../utils/validators/moduleValidator");
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = express.Router();
router.use(verifyUser);
router.get("/", getAllModules);
router.post("/new", verifyUserAndAdmin, createModuleValidator, createModule);
router.get("/:id", getModuleByid);
router.put("/:id", verifyUserAndAdmin, updateModuleValidator, updateModule);
router.delete("/:id", verifyUserAndAdmin, deleteModule);

module.exports = router;
