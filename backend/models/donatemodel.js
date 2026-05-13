const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  bloodGroup: String,
  donationtype: String,
  quantity: Number,
  hospital:String,
  unitid: Number,
  message: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});