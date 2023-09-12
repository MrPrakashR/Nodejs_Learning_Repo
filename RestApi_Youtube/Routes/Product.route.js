const express = require("express")
const router = express.Router()

const ProductController = require("../Controllers/Product.Controllers")

router.get("/",ProductController.getAllProducts)

router.post("/",ProductController.createNewProduct)

router.get("/:id",ProductController.findProductById)

router.patch("/:id",ProductController.updateAnProduct)

router.delete("/:id",ProductController.deleteAnProduct)

module.exports = router