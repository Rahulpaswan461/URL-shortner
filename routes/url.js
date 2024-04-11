const express = require("express")
const { HandlegenerateNewShortURL, HandleGetRedirecURL,handleGetAnalytics } = require("../controllers/url")
const router = express.Router()

router.post("/",HandlegenerateNewShortURL)
router.get("/:id",HandleGetRedirecURL)
router.get("/analytics/:shortId",handleGetAnalytics)

module.exports  = router