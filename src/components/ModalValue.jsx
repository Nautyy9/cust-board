import { Avatar, Box, Container, Rating, } from '@mui/material'

import {  } from '@mui/system'
import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApisContext } from '../Context';



function ModalValue({ orders, barcodeData, userId, price, length}) {

  const {setMsg, msg, conData} = useContext(ApisContext)
  
  console.log( msg);

const [dbData, setDbData] = useState() 
const [popUp, setPopUp] = useState(false)

var rating ;
var quantity = parseInt(barcodeData.quantity);
var itemNo = barcodeData.product_id;
var total = price * quantity

const nav = useNavigate();


  useEffect(() => {
    window.onload = ( )=> {
      nav('/');
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {

    var subscribe = true;
    if(subscribe && msg === 'added_weight')
    {
      dbPost();
    }
    if(subscribe &&  msg === 'removed_weight')
    {
      dbDelete();
    }
    if(subscribe && msg === 'label'){
      console.log('data from label only');
    }
    if(subscribe && msg === 'notstable') {
      setPopUp(true);
    }
    if(subscribe && msg === 'stable'){
      setPopUp(false)
    }
    if(subscribe && msg === 'r_label')
    {
      console.log('error from label');
      
    }
    return () => {
      subscribe = false
    }
},[ total, msg, conData])

console.log(userId);

  async function dbPost () {
    const evalOrders = orders[0];

const hsn = evalOrders.hsn;
const name = evalOrders.name;
const image_url = evalOrders.images[0].url;

const tax_code = evalOrders.tax.code;
const tax_name = evalOrders.tax.name;
const tax_rate = evalOrders.tax.rate;

const item_varient = evalOrders.item_varient;
const asp = evalOrders.warehouses.ASP;
const mrp = evalOrders.warehouses.MRP;
const barcode = evalOrders.barcode[0].barcode;
console.log("userID", userId,"hsn",hsn,"name", name,"image_url", image_url,"tax", tax_code, tax_name, tax_rate, "item_varient", item_varient,"asp", asp,"mrp", mrp ,"barcode", barcode, "fulfilled_quantity", quantity, "total", total);

try{
    const response = await axios.post('http://192.168.1.192:85/api/add_item', {
        "order_id": `${userId}`,
        "item_number":`${itemNo}`,
        "hsn":`${hsn}`,
        "item_name":`${name}`,
        "barcode":`${barcode}`,
        "image_url":`${image_url}`,
        "tax":  {
          "code": `${tax_code}`,
          "name": `${tax_name}`,
          "rate": tax_rate
      },
        "item_varient":`${(item_varient || "")}`,
        "fulfilled_quantity": quantity,
        "unit_price":{
            "asp": asp,
            "mrp":mrp
        },
        "item_total": total,
        "rating": rating
})
    const data =  response;
    console.log('modal value data',data);
    setDbData(data)
    }
    catch(err) {
      console.log(err);
    }
}



async function dbDelete () {
  const evalOrders = orders[0];

const hsn = evalOrders.hsn;
const name = evalOrders.name;
const image_url = evalOrders.images[0].url;

const tax_code = evalOrders.tax.code;
const tax_name = evalOrders.tax.name;
const tax_rate = evalOrders.tax.rate;

const item_varient = evalOrders.item_varient;
const asp = evalOrders.warehouses.ASP;
const mrp = evalOrders.warehouses.MRP;
const barcode = evalOrders.barcode[0].barcode;
console.log("userID", userId,"hsn",hsn,"name", name,"image_url", image_url,"tax", tax_code,"item_varient", item_varient,"asp", asp,"mrp", mrp ,"barcode", barcode);

try{
  const response = await axios.post('http://192.168.1.192:85/api/remove_item', {
      "order_id": `${userId}`,
      "item_number":`${itemNo}`,
      "hsn":`${hsn}`,
      "item_name":`${name}`,
      "barcode":`${barcode}`,
      "image_url":`${image_url}`,
      "tax":  {
        "code": `${tax_code}`,
        "name": `${tax_name}`,
        "rate": tax_rate
    },
      "item_varient":`${(item_varient || "")}`,
      "fulfilled_quantity":quantity,
      "unit_price":{
          "asp": asp,
          "mrp":mrp
      },
      "item_total": total,
      "rating": rating
      
})
  const data =  response;
  console.log('modal value data',data);
  setDbData(data)
  }
  catch(err) {
    console.log(err);
  }
}
 
  return (
    <div>
        <div className='absolute justify-center left-10 right-10  lg:left-1/4 lg:right-1/4 top-28 overflow-y-auto bg-white shadow-lg rounded-xl border border-gray-200 '>
          <table className=' table-auto w-full my-4'> 
           
            <Container  className='text-lg font-sans  grid grid-flow-row '>
              <tr className='grid grid-flow-col justify-items-center  my-2'>
                
                  <th className='list-outside  flex  '><span className='font-serif '> Item </span></th>
                  <th className='list-outside  flex text-center'><span className='font-serif'> Item Name  </span></th>
                  <th className=' list-outside flex text-center  '><span className='font-serif'> Item Price  </span></th>
                  <th className=' list-outside flex text-center '><span className='font-serif'> Total Quantity  </span></th>
                
                 
              </tr>

              <ul>

              {(orders && !dbData) ? orders.map((val,ind) =>(
               
                <Box key={ind} sx={{mx: 0, display: 'grid',gridAutoFlow: 'column', gridColumn: 12, justifyContent: 'stretch',  alignItems: 'center'}} >
                

                    
                    <td className='grid col-span-1 justify-center'>
                      <Avatar sx={{ width: 80,  height: 80}}>
                        <img src={val.images[ind].url} alt='item' />
                      </Avatar>
                        <Rating name="read-only" size='small' sx={{ display: 'flex', alignItems: 'start'}} value={rating = val.rating} readOnly />
                    </td>
                  

                      <td className='grid col-span-1 text-center xl:text-start 2xl:text-center w-full'><span className='sm:text-lg  text-red-700 font-bold'>{val.name.length > 15? (
                        val.name.slice(0, 15)
                      ): (val.name)}</span> </td>
                      <td className='grid col-span-2 xl:col-span-1  text-start  lg:text-center  xl:px-10 lg:pr-10  w-full'><span className='sm:text-lg  font-bold'>₹ {quantity === '0' ? price : total}</span></td>
                      <td className='grid  col-span-2 xl:col-span-4 2xl:col-span-3  text-center w-full'><span className='sm:text-lg  font-bold '>{quantity}</span></td>
                      
                
               
                  
                </Box>
              )) : dbData?.data.order_data.item_data.map((val,ind) =>(
               console.log("got the data", dbData.data.order_data.item_data),
                <Box key={ind} sx={{mx: 0, display: 'grid',gridAutoFlow: 'column', gridColumn: 12, justifyContent: 'stretch',  alignItems: 'center'}} >
                

                    
                    <td className='grid col-span-1 justify-center'>
                      <Avatar sx={{ width: 80,  height: 80}}>
                        <img src={val.image_url} alt='item' />
                      </Avatar>
                        <Rating name="read-only" size='small' sx={{ display: 'flex', alignItems: 'start'}} value={5} readOnly />
                    </td>
                  

                      <td className='grid col-span-1 text-center xl:text-start 2xl:text-center w-full'><span className='sm:text-lg  text-red-700 font-bold'>{val.item_name.length > 15? (
                        val.item_name.slice(0, 15)
                      ): (val.item_name)}</span> </td>
                      <td className='grid col-span-2 xl:col-span-1  text-start  lg:text-center  xl:px-10 lg:pr-10  w-full'><span className='sm:text-lg  font-bold'>₹ {val.fulfilled_quantity === '0' ? val.unit_price.mrp : val.item_total}</span></td>
                      <td className='grid  col-span-2 xl:col-span-4 2xl:col-span-3  text-center w-full'><span className='sm:text-lg  font-bold '>{val.fulfilled_quantity}</span></td>
                      
                
               
                  
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