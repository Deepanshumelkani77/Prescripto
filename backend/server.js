const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend 


//app config
const app=express();
const port=5000;
app.listen(port,()=>{
    console.log("server is running",port);
})
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      await mongoose.connect(
"mongodb+srv://deepumelkani123:appointment@cluster0.ykmvxml.mongodb.net/prescripto?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };
//db connectin model
connectDB();




//router
const doctor=require("./routes/Doctor.js");
app.use("/doctor",doctor);