const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1. Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save new user
    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });
    await newUser.save();

    // 5. Generate JWT
    const token = jwt.sign(
      { userId: newUser._id, role: "user" }, // ✅ improved naming
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Send response (CONSISTENT STRUCTURE)
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,   // ✅ FIXED
        name: newUser.name,
        email: newUser.email,
        role: "user",
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Login User / Admin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔐 Admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { userId: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          _id: "admin",   // ✅ always present
          name: "Admin",
          email,
          role: "admin",
        },
      });
    }

    // 👤 Normal user login
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: "user" }, // ✅ consistent naming
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Sending user:", {
  _id: existingUser._id,
  name: existingUser.name
});

    res.status(200).json({
      message: "User login successful",
      token,
      user: {
        _id: existingUser._id,   // ✅ consistent
        name: existingUser.name,
        email: existingUser.email,
        role: "user",
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Get all users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// ✅ Delete user (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
};