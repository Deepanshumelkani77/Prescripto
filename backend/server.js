const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend 


//app config
const app=express();
const port=5000;
app.listen(port,()=>{
    console.log("server is running",port);
})


//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      await mongoose.connect(
"mongodb+srv://deepumelkani123_db_user:Prescripto@cluster0.dp2e1h4.mongodb.net/?appName=Cluster0"
      );
      console.log("database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };
//db connectin model
connectDB();


//middleware

app.use(cors());  //using this we access the backend from any frontend
const { ObjectId } = require('mongodb');


// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
app.use(express.json()); //we send request frontend to backend




//router
const doctor=require("./routes/Doctor.js");
app.use("/doctor",doctor);
const admin=require("./routes/Admin.js");
app.use("/admin",admin);
const user=require("./routes/User.js");
app.use("/user",user);
const appointment=require("./routes/Appointment.js");
app.use("/appointment",appointment)
const paymentRoute = require("./routes/Payment.js");
app.use("/payment", paymentRoute);
