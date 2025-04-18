// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_e0fTSfe78HnUuT",
  key_secret: "IItZU6fzvhXUQPY8q3J4hB3X",
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise (₹100 = 10000 paise)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
});

module.exports = router;
