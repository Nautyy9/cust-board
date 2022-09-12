import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Success() {

  const nav = useNavigate()

  useEffect(() =>{
    window.onload = () =>{
      nav('/');
    }
    window.onpopstate = () =>{
      nav('/');
    }
   }, [nav])
 
  return (
    <div className=' popup-content flex flex-col'>

    <div className=' relative grid items-center justify-center top-40 sm:top-52 md:top-72 '>
    <div className=' relative grid items-center justify-center bottom-10 '>
      <img src={require('../assets/64787-success1.png')} alt=' Payment Successful' className='  relative flex items-center justify-center' style={{borderRadius: 10 }} ></img>
    </div>
    <div className='flex flex-col justify-center items-center'>
    <h1 className='text-3xl text-red-500 font-bold'>Payment Successful, Thank you for shopping with Deerika </h1>
    <Link to='/' className='w-40 h-12 hover rounded-full flex items-center justify-center mt-6  bg-yellow-500 '><span className=' text-xl font-semibold text-black '>Home</span></Link>
    </div>
    </div>
    </div>
  )



}

export default Success