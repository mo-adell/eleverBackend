import express from "express"
import { isAdmin, isAuth } from "../middleware.js"
import { createSubcategory, deleteRelSubcategory, deleteSubcategory, editSubcategory, getSubcategories, getSubcategory } from "../controllers/subcategoryController.js"

const subcategoryRouter = express.Router()

subcategoryRouter.get("/", getSubcategories) ////getting subcategories list

subcategoryRouter.get("/:id", getSubcategory) ////getting specific category

subcategoryRouter.post("/", isAuth, isAdmin, createSubcategory) ////creating subcategory

subcategoryRouter.put("/:id", isAuth, isAdmin, editSubcategory) ////editing subcategory

subcategoryRouter.delete("/deletesub/:id", isAuth, isAdmin, deleteSubcategory) ///deleting subcategory router

subcategoryRouter.delete("/deleterelsubs/:id", isAuth, isAdmin, deleteRelSubcategory) ///deleting categories subcategory router

export default subcategoryRouter
