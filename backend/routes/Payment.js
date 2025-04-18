// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_PuXf2SZhGaKEGd",
  key_secret: "3cg1g3rUN5z4PXYtnv87gJCQ",
});

router.post("/create-order", async (req, res) => {
    const { amount } = req.body;
    console.log("🧾 Received payment amount:", amount);
  
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
  
    try {
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      });
  
      console.log(" Razorpay order created:", order);
      res.status(200).json(order);
    } catch (err) {
      console.error(" Razorpay error:", err);
      res.status(500).json({ error: "Razorpay order creation failed" });
    }
  });
  

module.exports = router;
