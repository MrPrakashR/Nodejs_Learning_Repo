const express = require("express")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const {connectToMongooseDB} = require('./connect')

const app = express()
const PORT = 8001

connectToMongooseDB('mongodb+srv://admin:admin@ecommerce-prakash.bybdb3e.mongodb.net/Ecommerce-Prakash').then (()=>
    console.log("Mongodb connected")
)

app.use(express.json())
app.use("/url",urlRoute)

app.get("/:shortId", async (req,res)=> {
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

