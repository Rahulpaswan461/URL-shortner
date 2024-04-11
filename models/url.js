const mongoose = require("mongoose")
const UrlSchema = new mongoose.Schema({
      shortId : {
          type:String,
          required:true,
          unique:true,
      },
      redirectURL:{
           type:String,
      },
      visitHistory:[{timestamp : {type:Number}}],
      createdBy: {
        //we are storing the id of which use has created this id that
        // is the reason we have use the below type
         type:mongoose.Schema.Types.ObjectId,
         ref:"user",
      }

},{ timestamps: true}

);

const URL  = mongoose.model("urls",UrlSchema)

module.exports = URL