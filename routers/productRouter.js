import express from "express"
import { isAdmin, isAuth } from "../middleware.js"
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getProducts) //sending products from DB to frontend

productRouter.get("/:id", getProduct) //sending specific product to frontend using its ID

productRouter.post("/", isAuth, isAdmin, createProduct) //new product creation by admin

productRouter.put("/:id", isAuth, isAdmin, editProduct) //editing product router

productRouter.delete("/:id", isAuth, isAdmin, deleteProduct) //deleting product router

export default productRouter
