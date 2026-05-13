const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
const Request = require("../models/bloodrequestmodel");

// const Hospital = require("../models/hospitalmodel"); ❌ not needed yet

// Dashboard overview
router.get("/stats", async (req, res) => {
  try {
    const totalDonors = await User.countDocuments({ role: "Donor" });
    const totalRequests = await Request.countDocuments();
    const totalHospitals = 5; // ✅ temporary static count
    res.json({ totalDonors, totalRequests, totalHospitals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "fullName bloodGroup role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch requests
router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find({}, "fullName bloodGroup status");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hospitals — static for now
router.get("/hospitals", async (req, res) => {
  res.json([
    { name: "City Hospital", city: "Delhi" },
    { name: "Global Care", city: "Mumbai" },
    { name: "Red Cross Center", city: "Bangalore" }
  ]);
});

module.exports = router;
