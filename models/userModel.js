const mongoose=require("mongoose");

const {ObjectId}= mongoose.Schema.Types

const userSchema=new mongoose.Schema({
       name:{
           type:String,
        //    required:true,
           default:""
       },
       username:{
        type:String,
        required:true,
        unique:true,
       },
       email:{
            type:String,
            required:true,
            // unique:true,
       },
       password:{
        type:String,
        required:true,
       },
      dateofbirth:{
        type:String,
        required:true,
      }



} ,{timestamps:true} );

  
  module.exports=mongoose.model('users',userSchema);