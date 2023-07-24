const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require:[true,"price must be provided"]
    },
    featured: {
        type:Boolean,
        default:false
    },
    rating: {
        type:Number,
        default:4.9
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values:[
                "apple","samsung","mi","dell"
            ],
            message: `{VALUE} is not supported`
        }
    }
})

module.exports = mongoose.model("Products",productSchema)