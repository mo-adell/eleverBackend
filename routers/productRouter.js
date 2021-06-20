import express from "express"
import { isAdmin, isAuth } from "../middleware.js"
import { createProduct, deleteProduct, deleteProductCategory, deleteProductSubcategory, editProduct, getProduct, getProducts } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getProducts) //sending products from DB to frontend

productRouter.get("/:id", getProduct) //sending specific product to frontend using its ID

productRouter.post("/", isAuth, isAdmin, createProduct) //new product creation by admin

productRouter.put("/:id", isAuth, isAdmin, editProduct) //editing product router

productRouter.delete("/deleteproduct/:id", isAuth, isAdmin, deleteProduct) //deleting product router

productRouter.delete("/deletesubcategory/:id", isAuth, isAdmin, deleteProductSubcategory) //deleting products in deleted subcategory router

productRouter.delete("/deletecategory/:id", isAuth, isAdmin, deleteProductCategory) //deleting products in deleted category router
export default productRouter
