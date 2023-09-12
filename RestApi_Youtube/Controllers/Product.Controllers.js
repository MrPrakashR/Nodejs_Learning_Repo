const createError = require("http-errors")
const mongoose = require("mongoose")


const Product = require("../Models/Product.model")

module.exports = {
    getAllProducts : async (req,res,next)=>{

        try {
            const result = await Product.find({},{__v:0})
            // const result = await Product.find({},{name:1,price:1,_id:0})
            // const result = await Product.find({price:999},{name:1,price:1,_id:0})
    
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    findProductById: async (req,res,next)=>{
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
    },

    createNewProduct: async (req,res,next)=>{
 
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
    },

    updateAnProduct: async (req,res,next)=>{
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
    },

    deleteAnProduct: async (req,res,next)=>{
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
     },
}