const mongoose=require('mongoose');

const appointmentSchema=new mongoose.Schema({
user_id:{type:String,required:true},



})

const Appointment=mongoose.model('Appointment',appointmentSchema);
module.exports=Appointment;