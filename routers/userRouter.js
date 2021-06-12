import express from "express"
import expressAsyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import data from "../data.js"
import User from "../models/userModel.js"
import { generateToken, isAuth, isAdmin } from "../middleware.js"
import { detailsUser, editProfile, editUser, getUsers, registerUser, signinUser, deleteUser } from "../controllers/userController.js"

const userRouter = express.Router()

////signin in router

userRouter.post("/signin", signinUser)

////registration router

userRouter.post("/register", registerUser)

////sending user details to frontend
userRouter.get("/:id", detailsUser)

////editing profile by user
userRouter.put("/profile", isAuth, editProfile)

////getting users list for admin
userRouter.get("/", isAuth, isAdmin, getUsers)

////editing user info by admin
userRouter.put("/:id", isAuth, isAdmin, editUser)

///deleting user
userRouter.delete("/:id", isAuth, isAdmin, deleteUser)

export default userRouter
