const express  = require("express")
const URL = require("../models/url")
const { restrictTo } = require("../middlewares/auth")
const router = express.Router()

router.get("/admin/urls",restrictTo(["Admin"]),async (req,res)=>{
       const allusers = await URL.find({})

       return res.render("home",{
        urls:allusers,
       })
})

router.get("/", restrictTo(["Admin","Normal"]),async (req,res)=>{
      if(!req.user) return res.redirect("/login")
      const allUsers = await URL.find({createdBy:req.user._id})

      return res.render("home",{
        url:allUsers,
      })
})
router.get("/signup",(req,res)=>{
   return res.render("signup");
})

router.get("/login",(req,res)=>{
  return res.render("login")
})
module.exports = router