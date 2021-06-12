import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    /////first section of the products details

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId, //getting the product by id from products in database
          ref: "Product",
          required: true,
        },
      },
    ],

    /////second section for address card details

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    /////third section for the checkout prices and order status card

    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //getting the user by id from users in database
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
)
const Order = mongoose.model("Order", orderSchema)
export default Order
