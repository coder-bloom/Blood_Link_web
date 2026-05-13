const express = require("express");
const { getAdminStats } = require("../controller/reportcontroller");
const router = express.Router();

router.get("/", getAdminStats);

module.exports = router;
