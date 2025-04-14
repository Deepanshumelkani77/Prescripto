const mongoose = require("mongoose");

const doctorLoginSchema=new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true}

})

const DoctorLogin=mongoose.model("DoctorLogin",doctorLoginSchema)
module.exports=DoctorLogin