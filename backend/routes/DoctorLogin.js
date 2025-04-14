const express=require("express");
const router=express.Router();
const DoctorLogin = require("../models/DoctorLogin.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 



router.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const doctor = new DoctorLogin({ username, email, password: hashedPassword });
      await doctor.save();
      res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  });
  


  router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const doctor = await DoctorLogin.findOne({ email });

    if (!doctor) return res.status(400).json({ message: "Doctor not found" });
  
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: doctor._id }, "secret", { expiresIn: "1h" });
    res.json({ token, doctor: {id:doctor._id, name: doctor.username, email: doctor.email } });


  })










module.exports=router;