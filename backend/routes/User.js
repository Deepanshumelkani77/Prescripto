const express=require("express");
const router=express.Router();
const User = require("../models/User.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 



router.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  });
  


  router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token, admin: {id:user._id, name: user.username, email: user.email } });


  })




module.exports=router;