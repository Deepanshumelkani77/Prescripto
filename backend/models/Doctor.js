const mongoose = require("mongoose");

const doctorSchema=new mongoose.Schema({

    name:{type:String,required:true},

image:{type:String},
email:{type:String,required:true},
speciality:{type:String,required:true},
degree:{type:String,required:true},
experience: {type:String,required:true},
about:  {type:String,required:true},
fees: {type:Number,required:true} ,
available: { type: Boolean, default: true },
address:{
    line1: {type:String,required:true} ,
    line2:   {type:String,required:true}
}





}, { timestamps: true })


const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor
