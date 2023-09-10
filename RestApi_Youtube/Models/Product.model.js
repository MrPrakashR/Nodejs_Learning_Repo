const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
})

const Product = mongoose.model("product",ProductSchema)
module.exports = Product