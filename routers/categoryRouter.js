import express from "express"

import { isAdmin, isAuth } from "../middleware.js"
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/categoryController.js"

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories) ////sending categories from DB to frontend

categoryRouter.get("/:id", getCategory) /////get specific category

categoryRouter.post("/", isAuth, isAdmin, createCategory) ////new category creation by admin

categoryRouter.put("/:id", isAuth, isAdmin, editCategory) ////editing category router

categoryRouter.delete("/:id", isAuth, isAdmin, deleteCategory) ///deleting category router

export default categoryRouter
