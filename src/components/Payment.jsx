import {  Card } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ApisContext } from '../Context'

function Payment({ scanResultFile, setScanResultWebCam, dbData, setDbData, pricing, setPricing ,balance, setBalance}) {

  const { conData} = useContext(ApisContext)

useEffect(() => {
  axios.post('http://dev.djtretailers.com/v2/wallet/admin/debit',{
      "mobile": "9999999999",
      "wallet": "0",
      "cashback": "1",
      "bill_no": "SMARTSTORE/12/6",
      "bill_value": "600"
    
  }, {
    headers: {
      Authorization : `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  .then((res)=> {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
}, []);


useEffect(() => {

  if(dbData) {
      nav('/orders')
  }

}, [conData])


  
const nav = useNavigate();

useEffect(() => {
//    window.onpopstate = () =>{
//     nav("/")
//    }
   window.onload =() =>{
    nav('/')
   }
}, [])

console.log(pricing, balance);

const handleDeerika = (e) =>{
  e.preventDefault()
 
  if(pricing.totalSp <= balance) {
    setBalance(balance = balance - pricing.totalSp);
    localStorage.setItem("rate", balance);
     setTimeout(() => {nav('./success')}, [1000]);
 
    // setTimeout(() => nav('/'), [5000])
    }
  else{
    alert('Wallet Balance is low')
  }
}

const handleSubmit = (e) =>{
  e.preventDefault();
  if(pricing.totalSp){
    const options = {
      key: 'rzp_test_ikLbxNSOmFmSXL',
      key_secret: 'WPbKnWFmlzPs9XcrxswLSNrs',
      amount: pricing.totalSp * 100,
      currency: 'INR',
      name: 'Payment Gateway',
      description: 'testing',
      handler: function(res){
       alert('Transaction Successful')
      },
      prefill:{
        name: `${scanResultFile.data.name}`,
        email: '',
        contact:''
      },
      notes: {
        address: 'one two testing'
      },
      theme: {
        color: 'blue'
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    
  }
  else{
    window.alert('Balance is empty')
  }
}

  return (
    <div className=''>

   
    <header className='header1 flex sm:flex-row relative justify-between items-center'>
      
        <h1 className=' text-sm sm:text-lg font-bold pl-6'> {scanResultFile  ? `Hi ${scanResultFile.data.name}` : "Qr Not Found"}</h1>
        <img src={require('../assets/Deerika_hunapstudio-01.png')} alt='aksdlk' className='img w-36  sm:w-60' ></img>
        <h1 className='flex flex-col sm:flex-row  relative  items-center text-sm sm:text-lg text-center font-bold '> 
        <img src={require('../assets/wallet-3.png') } alt="wallet" className='sm:mr-3'></img>Wallet Balance 
        
         <span className='text-green-700 text-sm md:text-2xl ml-1 sm:ml-4 '>
         ₹ {Math.round(balance)}
        </span>
         </h1>
            

    </header>
    <main className='main2 mt-20 sm:mt-40'>
    {scanResultFile ? <Card  className='  cardValue w-full sm:w-1/2 lg:w-1/3 h-40 grid grid-flow-col grid-cols-2 relative justify-start '>
        <div className='col-span-1 grid'>
        <h1 className='text-2xl font-bold grid justify-center items-center'>Amount to be Paid</h1>
        <h1 className='text-green-700 font-bold text-2xl grid justify-center mr-10 items-start '>₹{pricing.totalSp}</h1>
        </div>
        <div className='col-auto grid justify-center relative items-center'>
        <img src={require('../assets/wallet-3.png') } alt="wallet" className=' h-14 w-14 sm:mr-3'></img>
        </div>
        </Card>
        : ''}
        {scanResultFile ? <button  onClick={handleDeerika} className=' btn1 w-full  sm:w-1/2 md:w-1/3 lg:w-1/4  h-14 rounded-full flex justify-center items-center'>
        <img src={require('../assets/_Group_.png')} alt='deerika wallet'></img>Pay with Deerika Wallet
        </button>
        : ''}
        {scanResultFile ? <button className=' btn2 w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 h-14 rounded-full flex justify-center items-center' onClick={handleSubmit}>
        <img src={require('../assets/Group.png')} alt='payment'></img>Pay Online
        </button>
        : ''}
    </main>

  </div>
  )
}

export default Payment