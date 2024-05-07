const mongoose = require("mongoose")

const userScheme = new mongoose.Schema({
      name:{
         type:String,
         required:true,
      },
      email:{
        type:String,
        required:true,
      },
      role:{
          type:String,
          required:true,
          default:"Normal",
      },
      password:{
        type:String,
        required:true,
      },
},{timestamps:true})

const Users  = mongoose.model("users",userScheme)

module.exports = Users