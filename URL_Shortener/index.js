const express = require("express")
const URL = require("./models/url")
const path = require("path")
const {connectToMongooseDB} = require('./connect')
const cookieParser = require("cookie-parser")
const {restrictToLoginUserOnly,checkAuth} = require("./middleware/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express()
const PORT = 8001

connectToMongooseDB('mongodb+srv://admin:admin@ecommerce-prakash.bybdb3e.mongodb.net/Ecommerce-Prakash').then (()=>
    console.log("Mongodb connected")
)

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/url",restrictToLoginUserOnly,urlRoute)
app.use("/user",userRoute)
app.use("/",checkAuth,staticRoute)

app.get("/test", async (req,res) => {
    const allUrls = await URL.find({})
    res.render("Home",{
        urls:allUrls
    })
})


app.get("/url/:shortId", async (req,res)=> {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory: {
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,() => {console.log(`Server Listning on PORT ${PORT}`)})

