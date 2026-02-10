const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   beltNo:{
    type:Number,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true
   },
   role:{
    type:String,
    default:"firefighter"
   }
    
})


module.exports = mongoose.model("user" , userSchema)