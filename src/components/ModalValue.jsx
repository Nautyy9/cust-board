import { Avatar, Box, Container, Rating, } from '@mui/material'
import { useMemo } from 'react';

import {  } from '@mui/system'
import axios from 'axios';

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApisContext } from '../Context';
import Loading from './Loading';
import Popup from './Popup';


function  ModalValue  ({ orders, barcodeData, userId, item_data, price, length}) {

  const {setMsg, msg, conData} = useContext(ApisContext)
  
  console.log( conData);

const [dbData, setDbData] = useState() 
const [popUp, setPopUp] = useState(false);
const [checkDb, setCheckDb] = useState(false);
const [chai, setChai] = useState(false);


var rating ;
var quantity = parseInt(barcodeData.quantity);
var itemNo = barcodeData.product_id;
var total = price * quantity

const nav = useNavigate();


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


  useEffect(() => {
    window.onload = ( )=> {
      nav('/');
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    
    console.log('shiroro');
    var subscribe = true;
    if(subscribe && msg === 'added_weight')
    {
      dbPost();
      setCheckDb(true)
    }
    if(subscribe &&  msg === 'removed_weight')
    {
      dbDelete();
      setCheckDb(true)
    }
    if(subscribe && msg === 'label'){
      console.log('data from label only');
      // setCheckDb(true)
    }
    if(subscribe && msg === 'notstable') {
      setPopUp(true);
      setCheckDb(false)
    }
    if(subscribe && msg === 'stable'){
      setPopUp(false)
      setCheckDb(true)
    }
    if(subscribe && msg === 'r_label')
    {
      console.log('error from label');
      
    }
  
    return () => {
      console.log("suiii");
      subscribe = false
    }
},[orders])

console.log(userId);




 
  return (
    <div className='  '>
        <div className='relative grid w-full mt-10 mb-10 overflow-auto bg-white shadow-lg rounded-xl border border-gray-200 '>
          <table className=' table-auto my-4'> 
           
            { popUp ?  <Container  className='text-lg font-sans  grid grid-flow-row 'sx={{maxHeight: 600, overflowX: 'auto' , overflowY: 'auto'}}>
              <tr className='grid grid-flow-col justify-items-center  my-2'>
                
                  <th className='list-outside   '><span className='font-serif '> Item </span></th>
                  <th className='list-outside  '><span className='font-serif'> Item Name  </span></th>
                  <th className=' list-outside '><span className='font-serif'> Item Price  </span></th>
                  <th className=' list-outside  '><span className='font-serif'> Total Quantity  </span></th>

                 
              </tr>

              <ul>

              { (checkDb) ? dbData?.data.order_data.item_data.map((val,ind) =>(
               console.log("got the data", dbData.data.order_data.item_data),
                <Box key={ind} sx={{mx: 0, display: 'grid',gridAutoFlow: 'column', gridColumn: 12, justifyContent: 'stretch',  alignItems: 'center'}} >
                

                    
                    <td className='grid col-span-1 justify-center'>
                      <Avatar sx={{ width: 80,  height: 80}}>
                        <img src={val.image_url} alt='item' />
                      </Avatar>
                        <Rating name="read-only" size='small' sx={{ display: 'flex', alignItems: 'start'}} value={5} readOnly />
                    </td>
                  

                      <td className='grid col-span-1 text-center w-full'><span className='sm:text-lg  text-red-700 font-bold'>{val.item_name.length > 15? (
                        val.item_name.slice(0, 15)
                      ): (val.item_name)}</span> </td>
                      <td className='grid  col-span-1 text-start  lg:text-center '><span className='sm:text-lg  font-bold'>₹ {val.fulfilled_quantity === '0' ? val.unit_price.mrp : val.item_total}</span></td>
                      <td className='grid  col-span-1 lg:text-center '><span className='sm:text-lg  font-bold '>{val.fulfilled_quantity}</span></td>
                      
                
               
                  
                </Box>
              ))  : "Please Insert the data " }
              </ul>
              {/* <Divider /> */}
              {/* <ul className='items-center  justify-between md:justify-around flex flex-row '>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL ITEMS : {length}</li>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL PRICE : ₹{quantity === '0' ? price : price*quantity}</li>
                <li className=' p-2 md:p-4 text-red-700 text-sm sm:text-md md:text-lg font-bold'>TOTAL PRODUCT : {quantity}</li>

              </ul> */}
            </Container>
            : <Popup setOpen={setPopUp} open={!popUp}/>}
          </table>
        </div>
    </div>
  )
}

export default ModalValue