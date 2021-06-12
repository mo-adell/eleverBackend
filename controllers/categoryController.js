import expressAsyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"

////sending categories from DB to frontend

export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.send(categories)
})

/////get specific category

export const getCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    res.send(category)
  } else {
    res.status(404).send({ message: "Category Not Found" })
  }
})

////new category creation by admin

export const createCategory = expressAsyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  })
  const createdcategory = await category.save()
  res.send({ message: "category Created", category: createdcategory })
})

////editing category router

export const editCategory = expressAsyncHandler(async (req, res) => {
  const categoryId = req.params.id
  const category = await Category.findById(categoryId)

  if (category) {
    category.name = req.body.name

    const updatedcategory = await category.save()
    res.send({ message: "category Updated", category: updatedcategory })
  } else {
    res.status(404).send({ message: "category Not Found" })
  }
})

///deleting category router
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    const deletecategory = await category.remove()
    res.send({ message: "category Deleted", category: deletecategory })
  } else {
    res.status(404).send({ message: "category Not Found" })
  }
})
