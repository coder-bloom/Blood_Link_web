const express = require("express");
const { registerUser, loginUser , getAllUsers , deleteUser} = require("../controller/usercontroller");
 

const userrouter = express.Router();

// POST /api/auth/signup
userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/", getAllUsers);
userrouter.delete("/:id", deleteUser);

module.exports = userrouter;
