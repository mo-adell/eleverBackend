import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
  }
)
const Subcategory = mongoose.model("Subcategory", userSchema)
export default Subcategory
