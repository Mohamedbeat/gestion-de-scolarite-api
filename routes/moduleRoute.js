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

const router = express.Router();

router.get("/", getAllModules);
router.post("/new", createModuleValidator, createModule);
router.get("/:id", getModuleByid);
router.put("/:id", updateModuleValidator, updateModule);
router.delete("/:id", deleteModule);

module.exports = router;
