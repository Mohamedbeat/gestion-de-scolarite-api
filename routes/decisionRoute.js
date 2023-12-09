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
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = express.Router();
router.use(verifyUser);

router.get("/", getAllDecisionsValidator, getAllDecisions);
router.post(
  "/new",
  verifyUserAndAdmin,
  createDecisionValidator,
  createDecision
);
router.put("/", verifyUserAndAdmin, updateDecisionValidator, updateDecision);

router.get("/:id", getDecisionByid);
router.delete("/:id", verifyUserAndAdmin, deleteDecisionByid);
module.exports = router;
