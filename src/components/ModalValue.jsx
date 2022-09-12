import { Avatar, Box, Container, Divider, ListItemAvatar, Rating, } from '@mui/material'

import {  } from '@mui/system'

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function ModalValue({ orders, qty, price, length}) {
  

const nav = useNavigate();


var quantity = qty.quantity 

  useEffect(() => {
    window.onload = ( )=> {
      nav('/')
    }
    //eslint-disable-next-line
  }, [])

 
  return (
    <div>
        <div className='absolute justify-center left-10 right-10  lg:left-1/4 lg:right-1/4 top-28 overflow-y-auto bg-white shadow-lg rounded-xl border border-gray-200 '>
          <table className=' table-auto w-full my-4'> 
           
            <Container  className='text-lg font-sans  flex flex-row '>
              <tr className='flex justify-center my-2'>
                <div className='flex gap-20 md:gap-24 lg:gap-28 xl:gap-32' >
                  <th className='list-outside  flex text-center '><span className='font-serif'> Item </span></th>
                  <th className='list-outside  flex text-center'><span className='font-serif'> Item Name  </span></th>
                  <th className=' list-outside flex text-center  '><span className='font-serif'> Item Price  </span></th>
                  <th className=' list-outside flex text-center '><span className='font-serif'> Total Quantity  </span></th>
                </div>
                 
              </tr>

              <ul>

              {orders && orders.map((val,ind) =>(
                console.log('one two', val),
                <Box key={ind} className='  flex justify-evenly'>
                  <td className=' flex flex-col items-start justify-center'>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 80, marginLeft: 1, height: 80}}>
                        <img src={val.images[ind].url} alt='item' />
                      </Avatar>
                    </ListItemAvatar>
                        <Rating name="read-only" size='small' sx={{pr: 0, display: 'flex', justifyContent: 'between', alignItems: 'start'}} value={val.rating} readOnly />
                  </td>
                    <tr className='flex items-center  gap-20 md:gap-24 lg:gap-28 xl:gap-32'>

                      <td className=' text-center w-full'><span className='sm:text-lg  text-red-700 font-bold'>{val.name.length > 15? (
                        val.name.slice(0, 15)
                      ): (val.name)}</span> </td>
                      <td className='   text-center w-full'><span className='sm:text-lg font-bold'>₹ {quantity === '0' ? price : price*quantity}</span></td>
                      <td className='  text-center w-full'><span className='sm:text-lg font-bold '>{quantity}</span></td>
                  <Divider/>
                    </tr>
               
                  
                </Box>
              ))}
              </ul>
              {/* <Divider /> */}
              {/* <ul className='items-center  justify-between md:justify-around flex flex-row '>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL ITEMS : {length}</li>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL PRICE : ₹{quantity === '0' ? price : price*quantity}</li>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL PRODUCT : {quantity}</li>

              </ul> */}
            </Container>
          </table>
        </div>
    </div>
  )
}

export default ModalValue