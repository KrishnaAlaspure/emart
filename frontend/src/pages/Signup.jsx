import React, { useState } from 'react'
import loginIcon from '../assets/profile2.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helper/imageToBase64';
import axios from 'axios'
import summaryAPI from '../utils/summaryAPIs';
import toast from 'react-hot-toast';


const Signup = () => {
    const navigate =useNavigate()
    const [showPassword,setShowPassword]=useState(false);
    // const [data,setData]=useState({
    //     name:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:"",
    //     profilePicture:""
    // })

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [profilePicture,setProfilePicture]=useState("")
   
    const handlePicSubmit= async(e)=>{
        const file =e.target.files[0]
        //console.log(file);
        const imagePic =await imageToBase64(file);
        //console.log(imagePic);
        setProfilePicture(imagePic)
        //setData({...data,profilePicture:imagePic})
        //console.log(data);
        
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        

        try {
            const res= await axios.post(summaryAPI.signup.URL,{name,email,password,confirmPassword,profilePicture})
           
            console.log(res);
            if(res.data.success) {
                toast.success(res.data.message)
                navigate('/login')

            }
            if(res.data.error) toast.error(res.data.message)
        } catch (error) {
            console.log(error);
            toast.success(error.message)
        }

        // setData({
        //     name:"",
        //     email:"",
        //     password:"",
        //     confirmPassword:"",
        //     profilePicture:""
        // })
    }


  return (
    <section id='signup' className=' mt-4'>
        <div className='mx-auto container px-5  '>
            <div className='bg-white w-full p-2 max-w-md mx-auto rounded-lg'>
                <div className='w-24 h-24 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                    <img className='' src={profilePicture || loginIcon} alt="login" />
                    </div>
                    <form >
                        <label>
                        <div className=' cursor-pointer bg-opacity-80 bg-slate-300 absolute pt-1 pb-3 px-2 text-xs  text-center bottom-0 w-full '>
                        <p className=''>Upload Photo</p>
                        </div>
                        <input type="file"  className='hidden' onChange={handlePicSubmit}/>
                        </label>
                    </form>
                </div>

                <form onSubmit={handleSubmit}>
                <div className='mt-2'>
                    <label htmlFor="">Name</label>
                    <div className='bg-slate-200 p-2 mt-1 rounded-lg' >   
                        <input type="text" 
                        placeholder='Enter Name' required
                        className='w-full h-full outline-none bg-transparent'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-2'>
                    <label htmlFor="">Email</label>
                    <div className='bg-slate-200 p-2 mt-1 rounded-lg' >   
                        <input type="email" 
                        placeholder='Enter Email' required
                        className='w-full h-full outline-none bg-transparent'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-2 '>
                    <label htmlFor="">Password</label>
                    <div className='bg-slate-200 p-2 flex mt-1 rounded-lg items-center justify-center'>   
                        <input type='password' 
                        placeholder='Enter Password' required
                        className='w-full h-full outline-none bg-transparent'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        
                    </div>
                </div>

                <div className='mt-2 '>
                    <label htmlFor="">Confirm Password</label>
                    <div className='bg-slate-200 p-2 flex mt-1 rounded-lg items-center justify-center'>   
                        <input type={showPassword?'':'password'} 
                        placeholder='Enter Password' required
                        className='w-full h-full outline-none bg-transparent'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        <div className='cursor-pointer text-xl ' onClick={()=>setShowPassword(!showPassword)}>
                            <span>
                                {
                                showPassword ?
                                (
                                    '🙉'
                               ):
                               (
                                '🙈'
                               )
                                }
                                
                            </span>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <button className='bg-yellow-400 text-xl text-white py-1 px-2 rounded-full cursor-pointer w-full max-w-[150px] hover:bg-yellow-500 hover:scale-110 transition-all '>
                        Signup
                    </button>
                </div>
            </form>

            <div className='mt-1'>
                <p>Already have an account ? <Link to={'/login'}><span className='text-lg font-normal  hover:text-red-700 hover:underline'>Login</span></Link></p>
            </div>
            </div>
        </div>

    </section>
  )
}

export default Signup
