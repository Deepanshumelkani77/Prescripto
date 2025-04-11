const mongoose = require("mongoose");

const doctorSchema=new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:Number},
image:{type:String,required:true},
speciality:{type:String,required:true},
degree:{type:String,required:true},
experience: {type:String,required:true},
about:  {type:String,required:true},
fees: {type:Number,required:true} ,
address:{
    line1: {type:Number,required:true} ,
    line2:   {type:Number,required:true}
}





})


const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor
