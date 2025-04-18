const express=require("express");
const router=express.Router();
const Appointment = require("../models/Appointment.js");
const mongoose = require("mongoose");


router.get("/", async (req, res) => {
    try {
      const appointment = await Appointment.find()
        .populate('doc_id')   // Populate doctor data
        // Populate user data
  
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error });
    }
  });





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

router.get("/doctor", async (req, res) => {
  try {
    const appointment = await Appointment.find()
    .populate('user_id')   // populate user
  .populate('doc_id'); 
  
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});



router.delete("/delete/:id",async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment cancel successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


router.post('/update-payment/:id', async (req, res) => {
  const { id } = req.params;
  const { paid, payment_id } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { paid, payment_id },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


module.exports=router