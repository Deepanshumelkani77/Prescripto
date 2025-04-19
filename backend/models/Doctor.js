const mongoose = require("mongoose");

const doctorSchema=new mongoose.Schema({

    name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
image:{type:String},
email:{type:String},
speciality:{type:String},
degree:{type:String},
experience: {type:String},
about:  {type:String},
fees: {type:Number} ,
available: { type: Boolean, },
address:{
    line1: {type:String} ,
    line2:   {type:String}
}





}, { timestamps: true })


const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor
