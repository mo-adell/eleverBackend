import express from "express"
import userRouter from "./routers/userRouter.js"
import dotenv from "dotenv"
import productRouter from "./routers/productRouter.js"
import orderRouter from "./routers/orderRouter.js"
import categoryRouter from "./routers/categoryRouter.js"
import subcategoryRouter from "./routers/subcategoryRouter.js"
import connectDb from "./config/db.js"

dotenv.config()

const app = express()

///should be at first to upload photos
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true })) //to parse the requested body

app.use(express.json())

connectDb() //connecting to database

//pathes
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.use("/categories", categoryRouter)
app.use("/subcategories", subcategoryRouter)

app.get("/", (req, res) => {
  res.send("Hello To Elever API")
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
