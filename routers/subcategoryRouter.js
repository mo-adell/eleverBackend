import express from "express"
import { isAdmin, isAuth } from "../middleware.js"
import { createSubcategory, deleteSubcategory, editSubcategory, getSubcategories, getSubcategory } from "../controllers/subcategoryController.js"

const subcategoryRouter = express.Router()

subcategoryRouter.get("/", getSubcategories) ////getting subcategories list

subcategoryRouter.get("/:id", getSubcategory) ////getting specific category

subcategoryRouter.post("/", isAuth, isAdmin, createSubcategory) ////creating subcategory

subcategoryRouter.put("/:id", isAuth, isAdmin, editSubcategory) ////editing subcategory

subcategoryRouter.delete("/:id", isAuth, isAdmin, deleteSubcategory) ///deleting subcategory router

export default subcategoryRouter
