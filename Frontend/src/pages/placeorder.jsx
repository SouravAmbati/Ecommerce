import React, { useContext, useState } from 'react'
import Title from '../components/title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext)
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    Email:'',
    Street:'',
    City:'',
    State:'',
    Zipcode:'',
    Country:'',
    Phone:''
  })
  const onChangeHandeler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setFormData(data=>({...data,[name]:value}))
  }
  const onSubmitHandeler=async(event)=>{
    event.preventDefault();
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:formData,
        items: orderItems,
        amount:getCartAmount()+delivery_fee,
        paymentMethod: method.toUpperCase()
      }
      switch(method){
        //Api call for cod orders
        case 'cod':
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          console.log(response.data);
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
          case 'stripe':
            const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            break
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  return (
    <form onSubmit={onSubmitHandeler} className='flex flex-col  sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* LeftSide */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandeler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandeler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandeler} name='Email' value={formData.Email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandeler} name='Street' value={formData.Street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandeler} name='City' value={formData.City} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandeler} name='State' value={formData.State} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandeler} name='Zipcode' value={formData.Zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='ZipCode' />
          <input required onChange={onChangeHandeler} name='Country' value={formData.Country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandeler} name='Phone' value={formData.Phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number"  placeholder='Phone' />
      </div>
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div  className='flex gap-3 flex-col lg:flex-row'>
            <div  onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black  text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder