const Products = require('../models/product')

getAllProducts = async (req,res) => {
    const myData = await Products.find(req.query)
    res.status(200).json({myData})
}

getAllProductsTesting = async (req,res) => {
    const myData = await Products.find({})
    res.status(200).json({ myData })
}

module.exports = {getAllProducts,getAllProductsTesting}

