import expressAsyncHandler from "express-async-handler"
import Subcategory from "../models/subcategoryModel.js"

////getting subcategories list

export const getSubcategories = expressAsyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find({}).populate("category")
  res.send(subcategories)
})

////getting subcategory

export const getSubcategory = expressAsyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id).populate("category")
  if (subcategory) {
    res.send(subcategory)
  } else {
    res.status(404).send({ message: "Subcategory Not Found" })
  }
})

////creating subcategory

export const createSubcategory = expressAsyncHandler(async (req, res) => {
  const subcategory = new Subcategory({
    name: req.body.subName,
    category: req.body.category,
  })
  const createdSubcategory = await subcategory.save()
  res.send({ message: "subcategory Created", subcategory: createdSubcategory })
})

////editing subcategory

export const editSubcategory = expressAsyncHandler(async (req, res) => {
  const subcategoryId = req.params.id
  const subcategory = await Subcategory.findById(subcategoryId)

  if (subcategory) {
    subcategory.name = req.body.name

    const updatedSubcategory = await subcategory.save()
    res.send({ message: "category Updated", subcategory: updatedSubcategory })
  } else {
    res.status(404).send({ message: "Subcategory Not Found" })
  }
})

///deleting subcategory router

export const deleteSubcategory = expressAsyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id)
  if (subcategory) {
    const deleteSubcategory = await subcategory.remove()
    res.send({ message: "Subcategory Deleted", subcategory: deleteSubcategory })
  } else {
    res.status(404).send({ message: "Subcategory Not Found" })
  }
})

///deleting subcategory related to category router

export const deleteRelSubcategory = expressAsyncHandler(async (req, res) => {
  const subcategory = await Subcategory.find({ category: req.params.id })
  if (subcategory) {
    // const deleteProduct = await product.remove()
    subcategory.map(async (subcategory) => {
      subcategory = await subcategory.remove()
      console.log("deletedSub")
    })
  } else {
    res.status(404).send({ message: "Subcategory Not Found" })
  }
})
