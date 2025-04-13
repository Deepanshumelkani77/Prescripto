const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
image:{type:String},
phone_no:Number,
address:{type:String},
gender:{type:String},
dob:{type:Date}

})

const User=mongoose.model("User",userSchema)
module.exports=User