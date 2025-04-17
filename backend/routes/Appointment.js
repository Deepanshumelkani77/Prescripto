const express=require("express");
const router=express.Router();
const Appointment = require("../models/Appointment.js");
const mongoose = require("mongoose");


router.get("/",async (req, res) => {
    try {
      const appointment= await Appointment.find().populate('doc_id');; // Fetch all documents from the Food collection
      res.status(200).json(appointment);    // Send the data as a JSON response
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error });
    }
  })




router.post("/",async(req, res) => {
    try{
  const { user_id,day,date,time,doc_id} = req.body;
console.log(req.body)
const appointment1=new Appointment({user_id:user_id,day:day,date:date,time:time,doc_id:doc_id})
appointment1.save();  
res.status(201).send({ message: "Appointment successfully done" });

  
}catch (err) {
  console.error(err);
  res.status(500).send({ message: "Something went wrong" });
}


}
)





module.exports=router