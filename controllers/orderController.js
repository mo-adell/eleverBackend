import expressAsyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

//recieving request for user orders history using user id (for me(Adel): an ununderstandable error don't forget to ask about it later)

export const getOrdersHistory = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.send(orders)
})

///getting full orders list

export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user")
  res.send(orders)
})

//making a new order for customer

export const createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" })
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    })
    const createdOrder = await order.save()
    res.status(201).send({ message: "New Order Created", order: createdOrder })
  }
})

//sending specific order details by order id

export const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({ message: "Order Not Found" })
  }
})

//deleting order

export const deleteOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    const deleteOrder = await order.remove()
    res.send({ message: "Order Deleted", order: deleteOrder })
  } else {
    res.status(404).send({ message: "Order Not Found" })
  }
})

//setting deliver status

export const deliverOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.send({ message: "Order Delivered", order: updatedOrder })
  } else {
    res.status(404).send({ message: "Order Not Found" })
  }
})
