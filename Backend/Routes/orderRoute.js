import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/ordercontroller.js'
import adminAuth from '../middlewear/adminauth.js'
import Authuser from '../middlewear/Auth.js';

const orderRouter=express.Router();
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',Authuser,placeOrder)
orderRouter.post('/stripe',Authuser,placeOrderStripe)

//user feature
orderRouter.post('/userorders',Authuser,userOrders)

//verify payment
orderRouter.post('/verifystripe',Authuser,verifyStripe)

export default orderRouter