const express=require("express");
const router=express.Router();
const Doctor = require("../models/Doctor.js");
const mongoose = require("mongoose");


router.get("/",async (req, res) => {
    try {
      const doctor= await Doctor.find(); // Fetch all documents from the Food collection
      res.status(200).json(doctor);    // Send the data as a JSON response
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error });
    }
  })

  

router.post("/",async(req, res)=>{




})




module.exports=router
