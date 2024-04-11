const Users = require("../models/users")
const {v4:uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function handleUserSignup(req,res){
      const {name,email,password} = req.body;

      await Users.create({
          name,
          email,
          password,
      })
      console.log(req.body)
      return res.render("home")
}  

async function handleUserLogin(req,res){
     const {name,email,password} = req.body;
     const user = await Users.findOne({email,password})
     if(!user)
       return res.render("login",{
      error:"Invalid Username or Password"})
      const sessionId = uuidv4();
     
       setUser(sessionId,user)
       res.cookie("uid",sessionId)
       return res.redirect("/")

}

module.exports = {
      handleUserSignup,
      handleUserLogin
}