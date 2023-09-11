const express = require("express")
const productRout = require("./Routes/Product.route")
const mongoose = require("mongoose") 
const createError = require("http-errors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://ecommerce-prakash.bybdb3e.mongodb.net/",
{
    dbName:'Ecommerce-Prakash',
    user:"admin",
    pass:'admin',
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Mongodb connected....")
})

app.all("/test",(req,res)=>{ 
    // console.log(req.query)
    // console.log(req.query.name)
    // res.send(req.query)

    ///test/:id/:name
    // console.log(req.params)
    // console.log(req.params.name)
    // res.send(req.params)

    console.log(req.body)
    res.send(req.body)
})

app.use("/products",productRout)

app.use((req,res,next)=>{
    // const error = new Error("Not Found")
    // err.status = 404
    // next(err)
    next(createError(404,"Not Found"))
})

///Error Handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error : {
        status: err.status || 500,
        message: err.message
        }
    })
})

app.listen(3000,()=>{
    console.log("Server started on port 3000....")
})