const express = require("express");
const {
  createDecision,
  getAllDecisions,
  getDecisionByid,
  updateDecision,
  deleteDecisionByid,
} = require("../services/decisionService");
const {
  createDecisionValidator,
  getAllDecisionsValidator,
  updateDecisionValidator,
} = require("../utils/validators/decisionValidator");

const router = express.Router();

router.get("/", getAllDecisionsValidator, getAllDecisions);
router.post("/new", createDecisionValidator, createDecision);
router.put("/", updateDecisionValidator, updateDecision);

router.get("/:id", getDecisionByid);
router.delete("/:id", deleteDecisionByid);
module.exports = router;
