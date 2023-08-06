const express = require("express")
const URL = require("../models/url")

const router = express.Router()

router.get("/", async (req,res)=>{
    if (!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy:req.user._id})
    res.render("Home",{
        urls:allUrls
    })
})

router.get("/signup",(req,res)=>{
    res.render("Signup")
})

router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = router