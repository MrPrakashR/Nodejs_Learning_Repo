const express = require("express")
const productRout = require("./Routes/Product.route")

const app = express()
app.use("/products",productRout)


app.listen(3000,()=>{
    console.log("Server started on port 3000....")
})