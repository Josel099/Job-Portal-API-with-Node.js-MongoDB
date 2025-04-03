const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, degree, course, marks, age, plusTwoPercentage, plusTwoStream } = req.body;

    const user = new User({ name, email, password, role });

    if (role === "collegeStudent") {
      user.degree = degree;
      user.course = course;
      user.marks = marks;
      user.age = age;
    } else if (role === "plustwoStudent") {
      user.plusTwoPercentage = plusTwoPercentage;
      user.plusTwoStream = plusTwoStream;
    }

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Correct password check (without hashing)
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Send all user data except password
    const { password: _, ...userData } = user.toObject();
    res.json({ message: "Login successful", user: userData });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};