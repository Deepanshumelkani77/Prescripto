const express=require("express");
const router=express.Router();
const Doctor = require("../models/Doctor.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 


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
  console.log(req.body)
  const { name, email,speciality, degree,experience,about,fees,available,address:{line1,line2},image } = req.body;

  // Perform update logic here
  try {
    // Assume updateFood is a function that updates the food item in the database
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id, 
      {name:name,image:image,email:email,speciality:speciality,degree:degree,experience:experience,about:about,fees:fees,available:available,address:{line1:line1,line2:line2},image:image},
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

router.get("/info/:id", async (req, res) => {
  console.log("Fetching doctor by ID");
  try {
    const { id } = req.params;

    // Find doctor by ID
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



router.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const doctor = new Doctor({ name, email, password: hashedPassword });
      await doctor.save();
      res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  });
  


  router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) return res.status(400).json({ message: "Doctor not found" });
  
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: doctor._id }, "secret", { expiresIn: "1h" });
    res.json({ token, doctor: {id:doctor._id, name: doctor.name, email: doctor.email } });


  })


module.exports=router
