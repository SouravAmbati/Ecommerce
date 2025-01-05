import express from 'express'
import { Loginuser,Registeruser,AdminLogin } from '../controllers/usercontroller.js'

const userRouter=express.Router();

userRouter.post('/register',Registeruser)
userRouter.post('/login',Loginuser)
userRouter.post('/admin',AdminLogin)

export default userRouter