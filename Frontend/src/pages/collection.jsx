import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/title';
import ProductItem from '../components/productItem';

const Collection = () => {
  const {search,showSearch}=useContext(ShopContext)
  const{products}=useContext(ShopContext);
  const[showFilter,setshowFilter]=useState(false);
  const[FilterProducts,setFilterProducts]=useState([]);
  const[category,setCategory]=useState([]);
  const[subCategory,setSubCategory]=useState([]);
  const[sortType,setSortType]=useState('relevant')
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }
  const ApplyFilter=()=>{
    let productsCopy=products.slice();
    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }
  const sortProduct=()=>{
    let filterProduct=FilterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProduct.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProducts(filterProduct.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        ApplyFilter();
        break;
    }
  }
  useEffect(()=>{
    ApplyFilter();
  },[category,subCategory,search,showSearch,products])
  useEffect(()=>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* FilterOptions */}
      <div className='min-w-60'>
        <p onClick={()=>setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* CategoryFilter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex  gap-2'>
              <input className='w-3 ' type="checkbox" value={"Men"} onChange={toggleCategory}/>Men
            </p>
            <p className='flex  gap-2'>
              <input className='w-3 ' type="checkbox" value={"Women"} onChange={toggleCategory}/>Women
            </p>
            <p className='flex  gap-2'>
            <input className='w-3 ' type="checkbox" value={"Kids"} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        {/* subCategoryFilter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex  gap-2'>
              <input className='w-3 ' type="checkbox" value={"Topwear"} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex  gap-2'>
              <input className='w-3 ' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex  gap-2'>
            <input className='w-3 ' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* RightSide */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* ProductSort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2 cursor-pointer'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low To High</option>
            <option value="high-low">Sort by: High To Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4 gap-y-6'>
          {
            FilterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} price={item.price} id={item._id} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection