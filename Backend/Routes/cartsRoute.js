import express from 'express'
import { addToCart,GetUserCart,UpdateCart } from '../controllers/cartcontroller.js'
import Authuser from '../middlewear/Auth.js';

const cartRouter=express.Router();
cartRouter.post('/get',Authuser,GetUserCart)
cartRouter.post('/add',Authuser,addToCart)
cartRouter.post('/update',Authuser,UpdateCart)

export default cartRouter