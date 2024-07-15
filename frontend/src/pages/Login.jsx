import React, { useContext, useState } from 'react'
import loginIcon from '../assets/profile2.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import summaryAPI from '../utils/summaryAPIs';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Context from '../contextAPI/contextIndex';

const Login = () => {
    const navigate =useNavigate()
    const [showPassword,setShowPassword]=useState(false);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
   const userContext=useContext(Context)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(email,password);
        try {
            const res= await axios.post(summaryAPI.login.URL,{email,password},
                { withCredentials: true }
            )
           
            console.log(res);
            if(res.data.success) {
                toast.success(res.data.message)
                navigate('/')
                userContext.fetchUserDetails()
                userContext.fetchAddToCartCount()

            }
            if(res.data.error) toast.error(res.data.message)
        } catch (error) {
            console.log(error);
            toast.success(error.message)
        }
        setEmail("")
        setPassword("")
        
    
    }


  return (
    <section id='login' className=' mt-6'>
        <div className='mx-auto container px-5  '>
            <div className='bg-white w-full p-2 max-w-md mx-auto rounded-lg'>
                <div className='w-24 h-24 mx-auto '>
                    <img className='rounded-full' src={loginIcon} alt="login" />
                </div>

                <form onSubmit={handleSubmit}>
                <div className='mt-2'>
                    <label htmlFor="">Email</label>
                    <div className='bg-slate-200 p-2 mt-1 rounded-lg' >   
                        <input type="email" 
                        placeholder='Enter Email' 
                        className='w-full h-full outline-none bg-transparent'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-2 '>
                    <label htmlFor="">Password</label>
                    <div className='bg-slate-200 p-2 flex mt-1 rounded-lg items-center justify-center'>   
                        <input type={showPassword?'':'password'} 
                        placeholder='Enter Password' 
                        className='w-full h-full outline-none bg-transparent'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
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
                    <Link to={'/forgotPassword'} className='block w-fit ml-auto hover:underline hover:text-slate-600'>
                    
                        Forgot Password?
                   
                    </Link>
                </div>
                <div className='mt-2'>
                    <button className='bg-yellow-400 text-xl text-white py-1 px-2 rounded-full cursor-pointer w-full max-w-[150px] hover:bg-yellow-500 hover:scale-110 transition-all '>
                        Login
                    </button>
                </div>
            </form>

            <div className='mt-1'>
                <p>Don't have an account ? <Link to={'/signup'}><span className='text-lg font-normal  hover:text-red-700 hover:underline'>Signup</span></Link></p>
            </div>
            </div>
        </div>

    </section>
  )
}

export default Login
