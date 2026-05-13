const express = require("express");
const {
  createRequest,
  getAllRequests,
  getUserRequests,
  updateRequestStatus,
  deleteRequest,
} = require("../controller/requestcontroller");

const router = express.Router();

router.post("/", createRequest);
router.get("/", getAllRequests);
router.get("/:userId", getUserRequests);
router.put("/:id/status", updateRequestStatus);
router.delete("/:id", deleteRequest);

module.exports = router;
