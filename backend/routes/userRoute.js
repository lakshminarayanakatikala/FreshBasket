import express from "express"
import { isAuth, login, logout, register } from "../controllers/usercontroller.js"
import authUser from "../middlewares/authUser.js"

const userRouter = express.Router()


userRouter.post('/register' , register)
userRouter.post('/login' , login)
userRouter.get('/is-auth', authUser, isAuth)  //------ll
userRouter.get('/logout', authUser, logout)

export default userRouter