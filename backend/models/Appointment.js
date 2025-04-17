const mongoose=require('mongoose');
const User=require('./User.js');
const Doctor=require('./Doctor.js');

const appointmentSchema=new mongoose.Schema({
user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
day:{type:String},
date:{type:String},
time:{type:String},
doc_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }



})

const Appointment=mongoose.model('Appointment',appointmentSchema);
module.exports=Appointment;