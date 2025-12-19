import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, error:{message:"Email and password required"} });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ success:false, error:{message:"User already exists"} });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "User registered successfully", data: { userId: user._id, email: user.email } });
  } catch (error) {
    console.error("AUTH REGISTER ERROR:", error);
    res.status(500).json({ success:false, error:{message:"Server error"} });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success:false, error:{message:"Invalid credentials"} });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success:false, error:{message:"Invalid credentials"} });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success:true, data:{ token } });
  } catch (error) {
    console.error("AUTH LOGIN ERROR:", error);
    res.status(500).json({ success:false, error:{message:"Server error"} });
  }
};
