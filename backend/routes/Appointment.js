const express=require("express");
const router=express.Router();
const Appointment = require("../models/Appointment.js");
const mongoose = require("mongoose");


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