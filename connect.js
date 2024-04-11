const mongoose  = require("mongoose")

async function connectMongoDB(filePath){
      return mongoose.connect(filePath)
}

module.exports = {
        connectMongoDB
}