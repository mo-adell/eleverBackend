import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const Category = mongoose.model("Category", userSchema)
export default Category
