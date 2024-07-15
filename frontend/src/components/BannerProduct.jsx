import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1_mobile from '../assets/banner/img1_mobile.jpg'
import image2_mobile from '../assets/banner/img2_mobile.webp'
import image3_mobile from '../assets/banner/img3_mobile.jpg'
import image4_mobile from '../assets/banner/img4_mobile.jpg'
import image5_mobile from '../assets/banner/img5_mobile.png'

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)
    const deskImgBanner =[image1,image2,image3,image4,image5]
    const mobImgBanner =[image1_mobile,image2_mobile,image3_mobile,image4_mobile,image5_mobile]

    const nextImage = () =>{
        if(deskImgBanner.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(deskImgBanner.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])


  return (
    <div className='contianer mx-auto px-6 overflow-hidden rounded '>
        <div className='h-56 md:h-80  w-full bg-slate-200 rounded-md relative'>
            <div className='absolute z-10 h-full w-full flex items-center '>
               <div className='md:flex justify-between w-full text-4xl text-slate-200 hidden '>
               <button onClick={preveImage} className='hover:bg-slate-600 rounded-full '> <IoIosArrowBack/></button>
               <button onClick={nextImage} className='hover:bg-slate-600 rounded-full '> <IoIosArrowForward/></button>
               </div>
            </div>
            <div className='hidden md:flex h-full w-full overflow-hidden'>
            {
                deskImgBanner?.map((el,index)=>{
                    return(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                        <img src={el} alt="" className=' h-full w-full   '/>  
                        </div>
                    )
                })
            }
            </div>

            <div className='flex h-full w-full overflow-hidden md:hidden'>
            {
                mobImgBanner.map((el,index)=>{
                    return(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                        <img src={el} alt="" className=' h-full w-full  object-contian   '/>  
                        </div>
                    )
                })
            }
            </div>
        </div>
      
    </div>
  )
}

export default BannerProduct
