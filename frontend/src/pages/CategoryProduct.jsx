import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Category } from '../helper/Category'
import axios from 'axios'
import summaryAPI from '../utils/summaryAPIs'
import SearchProductList from '../components/SearchProductList'

const CategoryProduct = () => {
    const [category,setCategory]=useState()
    const [data,setData]=useState()
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    
    const [filterCategoryList,setFilterCategoryList]=useState([])
    const [sortBy,setSortBy] = useState("")
    const location=useLocation()
    const url=new URLSearchParams(location.search)
    const urlCategoryListArray =url.getAll("categoryName")
    const urlCategoryListObj={}
    urlCategoryListArray.forEach(el=>{
      urlCategoryListObj[el]=true
    })

    const [selectCategory,setSelectCategory]=useState(urlCategoryListObj)
    console.log("===",urlCategoryListObj);
    const fetchData=async()=>{

      const res=await axios.post(summaryAPI.filterProductController.URL,{filterCategoryList})
      console.log("filter",res.data.data);
      setData(res?.data?.data)


    }

    const handleSelectFilterCategory=(e)=>{
      const {name,value,checked}=e.target
      setSelectCategory((pre)=>{
        return{
          ...pre,
          [value]:checked
        }
      })
    }
    console.log(selectCategory);

    const params =useParams()
    
    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter((el)=>el)
      setFilterCategoryList(arrayOfCategory)

      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `categoryName=${el}`
        }
        return `categoryName=${el}&&`
      })

      navigate("/productCategory?"+urlFormat.join(""))

      console.log("--",arrayOfCategory);
    },[selectCategory])

    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className=' container mx-auto '>
      {/* Desktop */}
      <div className='hidden md:grid grid-cols-[200px,1fr] '>
        {/* leftSide */}
        
        <div className='bg-white p-2 min-h-[calc(100vh-98px)]  '>
          
          <div>
            <h3 className='text-md text-slate-500 font-medium uppercase border-b-2 border-slate-500 pb-2'>Sort By</h3>

            <form action="" className='flex flex-col text-slate-600 gap-2 py-2'>
              <div className='flex text-sm gap-2 '>
                <input type="radio" name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                <label htmlFor="">Price - Low to High</label>
              </div>
              <div className='flex text-sm gap-2 '>
                <input type="radio" name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>


          <div>
            <h3 className='text-md text-slate-500 font-medium uppercase border-b-2 border-slate-500 py-2 '>Filter By</h3>

            <form action="" className='flex flex-col text-slate-600 gap-2 py-2'>
              {
                Category.map((el,index)=>{
                  return(
                    <div className='flex items-center gap-3'>
                    <input type="checkbox" name={'category'} id={el?.value} checked={selectCategory[el?.value]} value={el?.value} onChange={(e)=>handleSelectFilterCategory(e)}/>
                    <label htmlFor={el?.value}>{el?.value}</label>
  
                    </div>

                  )
                })
               
              }
            </form>
          </div>
        </div>
        {/* rightSide */}
        <div className='p-4 '>
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results</p>

            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]  no-scrollbar'>
                {
                    data !== 0 && !loading && (
                      <SearchProductList data={data} loading={loading}/>
                    )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
