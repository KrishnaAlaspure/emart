import { useEffect, useState } from 'react'
import '../src/App.css'

import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import summaryAPI from './utils/summaryAPIs'
import Context from './contextAPI/contextIndex'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './reduxStore/userSlice'

function App() {
  const dispatch =useDispatch()
  const [cartProductCount,setCartProductCount]=useState()

  const fetchUserDetails=async()=>{
    try {
      const res=await axios.get(`${summaryAPI.currentUserDetails.URL}`,
        { withCredentials: true }
      )
      //console.log(res.data.success);
      if(res.data.success){
        dispatch(setUserDetails(res.data.data))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAddToCartCount=async()=>{
    try {
      const res=await axios.get(`${summaryAPI.countAddtoCartItems.URL}`,
        { withCredentials: true }
      )
      console.log("count",res.data.data.count);
      setCartProductCount(res?.data?.data?.count)
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchUserDetails()

    fetchAddToCartCount()
  },[])


  return (
    <>
    <Context.Provider value={{fetchUserDetails,cartProductCount,fetchAddToCartCount}}>
    <Toaster/>
    <Header/>
    <main className='min-h-[calc(100vh-97px)]'><Outlet/></main>
    <Footer/>

    </Context.Provider>
    </>
  )
}

export default App
