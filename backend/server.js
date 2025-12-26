require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      if (!MONGODB_URI) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
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
const feedbackRoute = require("./routes/Feedback.js");

app.use("/payment", paymentRoute);
app.use("/api/feedback", feedbackRoute);


