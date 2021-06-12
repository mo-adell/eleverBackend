import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
    description: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)
const Product = mongoose.model("Product", productSchema)

export default Product
