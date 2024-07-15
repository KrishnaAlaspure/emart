import React, { useContext, useEffect, useState } from 'react'
import cartEmpty from '../assets/cartEmpty1.gif'
import axios from 'axios'
import summaryAPI from '../utils/summaryAPIs'
import Context from '../contextAPI/contextIndex'
import { RxCross2 } from "react-icons/rx";
import IndianCurrencyConverter from '../helper/IndianCurrencyConverter'


const AddToCartPageDetails = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const context =useContext(Context)

    const loadArray=new Array(5).fill(null)
    const fetchData=async()=>
    {   
        setLoading(true)
        const res=await axios.get(summaryAPI.addToCartViewController.URL,{
            withCredentials:true
        })

        console.log("cart",res.data.data);
        if(res.data.success){
            setData(res?.data?.data)
        }
        if(res.data.error){
            console.log(res.data.message)
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const increaseQty=async(_id,quantity)=>{
        const res=await axios.post(summaryAPI.updateCartProductQuantityController.URL,{_id,quantity:quantity+1},{
            withCredentials:true
        })
        console.log(res);
        if(res.data.success){
            fetchData()
        }
    }
    const decreaseQty=async(_id,quantity)=>{
        const res=await axios.post(summaryAPI.updateCartProductQuantityController.URL,{_id,quantity:quantity-1},{
            withCredentials:true
        })
        console.log(res);
        if(res.data.success){
            fetchData()
            
        }
    }

    const deleteProduct=async(_id)=>{
        const res=await axios.delete(`${summaryAPI.deleteProductFromCartController.URL}/`+_id,{
            withCredentials:true
        })
        console.log(res);
        if(res.data.success){
            context.fetchAddToCartCount()
            fetchData()

        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)

  return (
    <div className='container mx-auto p-4 md:p-0'>
        {
            data.length === 0  && !loading &&
            (
                <div className='flex flex-row items-center justify-center relative'>
                    <div className='bg-white w-64 h-52 flex flex-col items-center justify-center rounded-xl absolute top-40  '>
                    <div className='w-40 h-40 mt-2 p-2 items-center mix-blend-multiply '>
                    <img src={cartEmpty} alt="" />
                    </div>
                    <div className='bg-slate-400 w-full h-full flex items-center justify-center rounded-b-xl ' >
                    <p className='text-2xl text-white font-bold px-2'>Cart is empty!</p>
                    </div>
                  
                </div>
                </div>
            )
        }

        <div className='flex flex-col md:flex-row items-start md:justify-between gap-4'>
            <div className='w-full max-w-3xl'>
                {
                    loading ?
                    (
                        
                        loadArray.map((el,index)=>{
                            return(
                                <div key={index} className='w-full bg-slate-300 h-32 my-2 border border-slate-400 animate-pulse'>

                            </div>
                            )
                        })
                        
                    )
                    :
                    (
                        data.map((el,index)=>{
                            return(
                                <div key={index} className='w-full bg-white h-36  my-2 rounded grid grid-cols-[128px,1fr] relative'>
                                    <div className='absolute top-0 right-0 p-1 text-xl text-red-600 hover:bg-red-600 hover:rounded-full hover:text-white' onClick={()=>deleteProduct(el?._id)}>
                                        <RxCross2/>
                                    </div>
                                    <div className='w-28 h-36  bg-slate-300   p-1'>
                                        <img src={el?.productId?.productImage[0]} alt="" className='w-full h-full block mix-blend-multiply object-scale-down' />
                                    </div>
                                    <div className='p-2 md:p-2'>
                                        <h2 className='text-lg md:text-xl font-medium text-ellipsis line-clamp-1'>{el?.productId?.productName}</h2>
                                        <p className='text-white bg-yellow-400 text-sm font-bold w-fit px-1 rounded-md '>{el?.productId?.brandName}</p>
                                        <div className='mt-2 text-lg flex justify-between'>
                                            <p >{IndianCurrencyConverter(el?.productId?.sellingPrice)}</p>
                                            <p>{IndianCurrencyConverter(el?.productId?.sellingPrice*el?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center'>
                                        <p className='text-md mt-1 mr-2'>Quantity :</p>
                                        <div className='border-2 border-red-400 w-fit  mt-1 rounded'>
                                            <button className='border-r-2 border-red-400 px-2 text-xl hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(el?._id,el?.quantity)} >-</button>
                                            <span className=' px-2 text-lg'>{el?.quantity}</span>
                                            <button className='border-l-2 border-red-400 px-2 text-xl hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(el?._id,el?.quantity)} >+</button>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    
                                    
                            </div>
                            )
                        }) 
                    )
                }
            </div>

            {/* Summary Cart */}

            <div className='mt-5 md:mt-2 w-full max-w-sm ' >
                {
                    loading ?
                    (
                        <div className='h-48  bg-slate-300 border border-slate-400 animate-pulse'>
                            
                        </div>
                    )
                    :
                    (
                        data.length != 0 &&
                        <div className='h-48 bg-white border border-slate-400 rounded flex flex-col justify-between '>
                           <h2 className='bg-yellow-400 text-white text-xl pl-4 py-1 '> Order Total :</h2>
                           <div className='p-4 '>
                           <div className='flex justify-between text-xl px-4 '>
                            <p>Total Quantity</p>
                            {totalQty}
                           </div>
                           <div className='flex justify-between text-xl px-4 mt-5 '>
                            <p>Total Quantity</p>
                            {IndianCurrencyConverter(totalPrice)}
                           </div>
                           </div>
                           
                           <button className='bg-green-500 w-full text-xl p-2 rounded hover:text-white  '>Pay</button>
                           
                        </div>
                    )
                }
            </div>

        </div>
      
    </div>
  )
}

export default AddToCartPageDetails
