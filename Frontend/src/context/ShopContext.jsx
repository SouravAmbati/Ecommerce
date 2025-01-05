import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext=createContext();

const ShopContextProvide=(props)=>{
    const currency='$';
    const delivery_fee=10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const[search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false);
    const[cartItems,setCartItems]=useState({});
    const[products,setProducts]=useState([]);
    const[token,setToken]=useState('')
    const navigate=useNavigate();
    const Addtocart=async(itemId,productSize)=>{
        if(!productSize){
            toast.error('Select Product Size');
            return;
        }
        let CartData=structuredClone(cartItems);
        if(CartData[itemId]){
            if(CartData[itemId][productSize]){
                CartData[itemId][productSize]+=1
            }else{
                CartData[itemId][productSize]=1;
            }
        }else{
            CartData[itemId]={};
            CartData[itemId][productSize]=1;
        }
        setCartItems(CartData)
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,productSize},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message);
            }
        }
    }
    const getCartCount=()=>{
        let TotalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        TotalCount+=cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return TotalCount
    }
    const updateQuantity=async(itemId,productSize,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][productSize]=quantity;
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,productSize,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message);
            }
        }
    }
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }
    const getProductsData=async()=>{
        try {
            const response=await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.msg)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.msg)
        }
    }
    const getUserCart=async(token)=>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getProductsData();
    },[])
 
    useEffect(()=>{
       if(!token&&localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'));
       }
    },[])
    const value={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        Addtocart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItems
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvide