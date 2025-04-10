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

  

router.post("/",async(req, res) => {
    try{
  const { name, email,speciality, degree,experience,about,fees,address:{line1,line2},image } = req.body;
console.log(req.body)
const doctor1=new Doctor({name:name,image:image,email:email,speciality:speciality,degree:degree,experience:experience,about:about,fees:fees,address:{line1:line1,line2:line2},image:image})
doctor1.save();  
res.status(201).send({ message: "Doctor added successfully" });

  
}catch (err) {
  console.error(err);
  res.status(500).send({ message: "Something went wrong" });
}


}
)




module.exports=router
