import expressAsyncHandler from "express-async-handler"
import data from "../data.js"
import Product from "../models/productModel.js"

///sending products from DB to frontend
export const getProducts = expressAsyncHandler(async (req, res) => {
  const name = req.query.name || ""
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {}

  const products = await Product.find({ ...nameFilter })
    .populate("category")
    .populate("subcategory")
  res.send(products)
})

///sending specific product to frontend using its ID
export const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("subcategory").populate("category")
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
})

///new product creation by admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    brand: req.body.brand,
    countInStock: req.body.countInStock,
    rating: 3.5,
    numReviews: 12,
    description: req.body.description,
  })
  const createdProduct = await product.save()
  res.send({ message: "Product Created", product: createdProduct })
})

////editing product router
export const editProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  if (product) {
    product.name = req.body.name
    product.price = req.body.price
    product.image = req.body.image
    product.category = req.body.category
    product.subcategory = req.body.subcategory
    product.brand = req.body.brand
    product.countInStock = req.body.countInStock
    product.description = req.body.description
    const updatedProduct = await product.save()
    res.send({ message: "Product Updated", product: updatedProduct })
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
})

///deleting product router
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    const deleteProduct = await product.remove()
    res.send({ message: "Product Deleted", product: deleteProduct })
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
})
