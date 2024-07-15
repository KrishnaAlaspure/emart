import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import summaryAPI from '../utils/summaryAPIs'
import SearchProductList from '../components/SearchProductList'

const SearchProduct = () => {
    const query=useLocation()
    const [data,setData]=useState()
    const [loading,setLoading]=useState()

    console.log(query);
    const fetchData=async()=>{
        setLoading(true)
        const res=await axios.get(summaryAPI.searchProductController.URL+query.search)
        setData(res?.data?.data)
        console.log("search",data);
        setLoading(false)
    }

    useEffect(()=>{
        fetchData()
    },[query.search])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results </p>

      {
        data?.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }



      {
        data?.length !==0 && !loading && (
          
          <SearchProductList loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct
