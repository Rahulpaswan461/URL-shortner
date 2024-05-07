const {getUser} = require("../service/auth")

function checkForAuthentication(req,res,next){
       const tokenCookie = req.cookies.uid;
      //  console.log(tokenCookie)
       req.user = null;
      
       if(!tokenCookie)return next()

       const token = tokenCookie;
       const user = getUser(token)

       req.user = user;
       return next();
}


// This piece of code is written for the authorization purpose
function restrictTo(roles){
       return function(req,res,next){
            if(!req.user)return res.redirect("/login")

            if(!roles.includes(req.user.role))
            return res.end("You are unauthorized")

            return next();
       }

}
module.exports = {
      checkForAuthentication,
      restrictTo,
}