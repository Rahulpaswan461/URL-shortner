const { nanoid } = require("nanoid")
const URL = require('../models/url')

async function HandlegenerateNewShortURL(req,res){
       const body  = req.body;
       if(!body.url) return res.status(404).json({error:"url is required"})

       const shortID = nanoid(8);

      await URL.create({
         shortId:shortID,
         redirectURL:body.url,
         visitedHistory:[],
         createdBy : req.user._id,
       })

       return  res.render("home",{
               id:shortID,
       })
}
async function HandleGetRedirecURL(req,res){
         const shortId = req.params.id;
         const entry =  await URL.findOneAndUpdate({
              shortId,
         },
         {
           $push : {
              visitHistory:{
                     timestamp:Date.now(),
              },
           },
         })

       return res.redirect(entry.redirectURL)
} 
async function handleGetAnalytics(req,res){
       const shortId = req.params.shortId
       const result = await URL.findOne({shortId})

       return res.status(200).json({totalCount:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = {
       HandlegenerateNewShortURL,
       HandleGetRedirecURL,
       handleGetAnalytics
}