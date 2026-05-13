const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
try {
  await mongoose.connect(process.env.MONGO_URL );

  console.log("✅ connected with database");
  
} catch (error) {
    console.log("❌ connected with database" , error);
    
}
}

module.exports = connect;