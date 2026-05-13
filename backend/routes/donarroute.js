   const express = require("express");
const { donaterequest } = require("../controller/donatecontroller");
   const donarrouter = express.Router();

donarrouter.post("/",donaterequest);

module.exports = donarrouter;