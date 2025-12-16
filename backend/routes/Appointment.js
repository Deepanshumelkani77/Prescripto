const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment.js");
const mongoose = require("mongoose");
const moment = require('moment');

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doc_id')
      .populate('user_id');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

// Create new appointment with time slot validation
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { user_id, day, date, time, doc_id } = req.body;
    
    // Validate input
    if (!user_id || !day || !date || !time || !doc_id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the time slot is available
    const existingAppointment = await Appointment.findOne({
      doc_id,
      date: new Date(date),
      time,
      status: { $ne: 'cancelled' }
    }).session(session);

    if (existingAppointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ 
        message: "This time slot is already booked. Please choose another time." 
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      user_id,
      day,
      date: new Date(date),
      time,
      doc_id,
      status: 'pending'
    });

    await appointment.save({ session });
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({ 
      message: "Appointment booked successfully",
      appointment
    });
    
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating appointment:', err);
    if (err.code === 11000) {
      return res.status(409).json({ 
        message: "This time slot is already booked. Please choose another time." 
      });
    }
    res.status(500).json({ 
      message: "Failed to book appointment", 
      error: err.message 
    });
  }
});

// Get available time slots for a doctor on a specific date
router.get("/available-slots/:doctorId/:date", async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    
    // Create date range for the entire day in UTC
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    
    // Get all appointments for the doctor on the selected date
    const appointments = await Appointment.find({
      doc_id: doctorId,
      date: {
        $gte: startDate,
        $lte: endDate
      },
      status: { $ne: 'cancelled' }
    });
    
    // Get doctor's working hours (you might want to fetch this from doctor's profile)
    const workingHours = {
      start: '09:00',
      end: '17:00',
      slotDuration: 30 // in minutes
    };
    
    // Generate all possible time slots
    const allSlots = [];
    const startTime = moment(workingHours.start, 'HH:mm');
    const endTime = moment(workingHours.end, 'HH:mm');
    
    while (startTime.isBefore(endTime)) {
      const slotTime = startTime.format('HH:mm');
      allSlots.push(slotTime);
      startTime.add(workingHours.slotDuration, 'minutes');
    }
    
    // Get booked slots and normalize times
    const bookedSlots = appointments.map(apt => {
      // Convert stored time to HH:MM format
      if (!apt.time) return null;
      const [hours, minutes] = apt.time.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }).filter(Boolean);
    
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.status(200).json({
      date,
      availableSlots,
      bookedSlots
    });
    
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ 
      message: "Error fetching available time slots", 
      error: error.message 
    });
  }
});

// Get doctor's appointments
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doc_id: doctorId })
      .populate('user_id')
      .sort({ date: 1, time: 1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor's appointments", error });
  }
});

// Get user's appointments
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const appointments = await Appointment.find({ user_id: userId })
      .populate('doc_id')
      .sort({ date: 1, time: 1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user appointments", error });
  }
});

// Update appointment status
router.patch("/:id/status", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, session }
    );
    
    if (!appointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      message: `Appointment ${status} successfully`,
      appointment
    });
    
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error updating appointment status:', error);
    res.status(500).json({ 
      message: "Error updating appointment status", 
      error: error.message 
    });
  }
});

// Delete appointment
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

// Update payment
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

module.exports = router;