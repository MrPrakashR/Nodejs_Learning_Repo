const express = require("express")
const createError = require("http-errors")
const mongoose = require("mongoose")
const router = express.Router()

const Product = require("../Models/Product.model")

router.get("/",async (req,res,next)=>{

    try {
        const result = await Product.find({},{__v:0})
        // const result = await Product.find({},{name:1,price:1,_id:0})
        // const result = await Product.find({price:999},{name:1,price:1,_id:0})

        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
})

router.post("/",async (req,res,next)=>{
 
    try {
        const product = Product(req.body)
        const result = await product.save()
        res.send(result)
    } catch (error) {

        if(error.name == "ValidationError") {
            next(createError(422,error.message))
            return
        }
        next(error)
    }
})

router.get("/:id",async (req,res,next)=>{
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        // const product = await Product.findOne({_id:id})

        if(!product) {
            throw createError(404,"Product does not exist")
        }

        res.send(product)
    } catch (error) {
       
       if(error instanceof mongoose.CastError) {
        next(createError(400,"Invalid Product Id"))
        return
       }
       next(error) 
    }
})

router.patch("/:id",async (req,res,next)=>{
    try {
        const id = req.params.id
        const updates = req.body
        const options = {new:true}

        const product = await Product.findByIdAndUpdate(id,updates,options)
        if(!product) {
            throw createError(404,"Product does not exist")
        }        
        res.send(product)
    } catch (error) {
        if(error instanceof mongoose.CastError) {
            next(createError(400,"Invalid Product Id"))
            return
           }
           next(error)
    }
})

router.delete("/:id",async (req,res,next)=>{
   const id = req.params.id
   try {
    const result = await Product.findByIdAndDelete(id)
    if(!result) {
        throw createError(404,"Product does not exist")
    }  
    res.send(result)
   } catch (error) {
    if(error instanceof mongoose.CastError) {
        next(createError(400,"Invalid Product Id"))
        return
       }
       next(error) 
   }
})

module.exports = router