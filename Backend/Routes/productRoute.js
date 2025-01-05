import express from 'express';
import { Addproduct,Removeproduct,Listproducts,Singleproduct } from '../controllers/productcontroler.js';
import upload from '../middlewear/multer.js';
import adminAuth from '../middlewear/adminauth.js';
const productRouter=express.Router();
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}
    ,{name:'image4',maxCount:1}
]),Addproduct);
productRouter.post('/remove',adminAuth,Removeproduct);
productRouter.post('/single',Singleproduct);
productRouter.get('/list',Listproducts);

export default productRouter