import userModel from "../models/usermodel.js"

//Add products to user cart
const addToCart=async(req,res)=>{
    try {
        const{userId,itemId,productSize}=req.body
        const userData=await userModel.findById(userId);
        const cartData=await userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][productSize]){
                cartData[itemId][productSize]+=1
            }else{
                cartData[itemId][productSize]=1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][productSize]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added To Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:true,message:error.message})
    }
}
//Add user cart
const UpdateCart=async(req,res)=>{
    try {
        const{userId,itemId,productSize,quantity}=req.body
        const userData=await userModel.findById(userId);
        const cartData=await userData.cartData;
        cartData[itemId][productSize]=quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:true,message:error.message})
    }
}
//get user cart data
const GetUserCart=async(req,res)=>{
    try {
        const{userId}=req.body
        const userData=await userModel.findById(userId);
        const cartData=await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:true,message:error.message})
    }
}
export{addToCart,UpdateCart,GetUserCart}