const express=require("express");
const router=express.Router();
const Doctor = require("../models/Doctor.js");
const mongoose = require("mongoose");


router.get("/:id",async (req, res) => {
  try {
    const { id } = req.params;  // Extract the id from params correctly
    if (!mongoose.Types.ObjectId.isValid(id)) {  // Optional: check if id is a valid ObjectId
      return res.status(400).json({ message: 'Invalid food ID' });
    }

    
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);  // Return the food item as JSON
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server error', error });
  }
})



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


router.put('/edit/:id',async (req, res) => {
  const { id } = req.params;
  
  const { name, email,speciality, degree,experience,about,fees,address:{line1,line2},image } = req.body;

  // Perform update logic here
  try {
    // Assume updateFood is a function that updates the food item in the database
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id, 
      {name:name,image:image,email:email,speciality:speciality,degree:degree,experience:experience,about:about,fees:fees,address:{line1:line1,line2:line2},image:image},
      { new: true } // Return the updated document
    );
    res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})



router.delete("/delete/:id",async (req, res) => {
  const { id } = req.params;

  try {
    const deletedoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting Doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get("/info/:email", async (req, res) => {
  console.log("hello dev")
  try {
    const { email } = req.params;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);  // Send doctor data
  } catch (error) {
    console.error('Error fetching doctor by email:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});




module.exports=router
helo