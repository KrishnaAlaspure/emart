import axios from 'axios'
import summaryAPI from '../utils/summaryAPIs'
import toast from 'react-hot-toast'

export const AddToCart=async(e,id)=>{
const productId=id
 e.stopPropagation()
 e.preventDefault()

 const res=await axios.post(summaryAPI.addToCart.URL,{productId},{
    withCredentials: true
  })

  console.log("addtocart",res.data.message);

  if(res.data.success){
    toast.success(res.data.message)
  }

  if(res.data.error){
    toast.success(res.data.message)
  }
  return res
}
