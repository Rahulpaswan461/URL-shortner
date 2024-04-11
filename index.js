const express = require("express")
const urlRouter = require("./routes/url");
const { connectMongoDB } = require("./connect");
const URL = require("./models/url")
const UserRoute = require("./routes/user")
const path = require("node:path")
const staticRoute = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")


const app = express();
const PORT =8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("mongoDB is connected "))
.catch(()=>console.log("There is some error"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/url',restrictToLoggedinUserOnly,urlRouter)
app.use('/users',UserRoute)
app.use('/',checkAuth,staticRoute)

app.listen(PORT,()=>{
      console.log("Server is running at Port 8001")
})