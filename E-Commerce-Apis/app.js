const express = require("express")
require("dotenv").config()
const products_routes = require("./routes/products")
const connectDB = require("./db/connect")
const app = express()


const PORT = process.env.PORT || 5000

app.get("/", (req,res)=> {
    res.send("Hi, I am live")
})

//middlerware or to ser routes
app.use("/api/products",products_routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`${PORT} is Live right now`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()