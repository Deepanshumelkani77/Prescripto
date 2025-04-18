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
    res.json({ token, user: {id:user._id, name: user.username, email: user.email } });


  })


router.put('/edit/:id',async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { name,email,phone ,address,gender,dob,image } = req.body;
  console.log(req.body)

  // Perform update logic here
  try {
    // Assume updateFood is a function that updates the food item in the database
    const updateduser = await User.findByIdAndUpdate(
      id, 
      {username:name,phone_no:phone,address:address,gender:gender,dob:dob,image:image},
      { new: true } // Return the updated document
    );
    res.status(200).json({ message: 'Doctor updated successfully', updateduser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})




router.get("/info/:id",async (req, res) => {
  try {
    const { id } = req.params;  // Extract the id from params correctly
    if (!mongoose.Types.ObjectId.isValid(id)) {  // Optional: check if id is a valid ObjectId
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);  // Return the food item as JSON
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
})




module.exports=router;