
import axios from 'axios'


const url=`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNARY_CLOUD_NAME}/image/upload`



export const uploadImage=async(image)=>{
    const formData= new FormData()
    formData.append("file",image)
    formData.append("upload_preset","Emart_product")
    const resdata=await axios.post(url,formData)
    console.log(resdata);
    return resdata.data
    // const dataResponse = await fetch(url,{
    //     method : "post",
    //     body : formData
    // })

    // return dataResponse.json()

}