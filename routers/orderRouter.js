import express from "express"
import { isAuth, isAdmin } from "../middleware.js"
import { createOrder, deleteOrder, getOrder, getOrders, getOrdersHistory, deliverOrder } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.get("/mine", isAuth, getOrdersHistory) //getting orderhistory for use

orderRouter.get("/", isAuth, isAdmin, getOrders) //getting full orders list

orderRouter.post("/", isAuth, createOrder) //making a new order for customer

orderRouter.get("/:id", isAuth, getOrder) //sending specific order details by order id

orderRouter.delete("/:id", isAuth, isAdmin, deleteOrder) //deleting order

orderRouter.put("/:id/deliver", isAuth, isAdmin, deliverOrder) //setting deliver status

export default orderRouter
