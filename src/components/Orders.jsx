
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import ModalValue from './ModalValue';
import axios from 'axios';
import { ApisContext } from '../Context';




const Orders = ({scanResultFile,scanResultWebCam ,price,dbData, setDbData, setPrice, balance, setBalance, pricing, setPricing}) => {

  const {conData, } = useContext(ApisContext)
  
  const [data, setData] = useState({
    Orders: [],
    Qty: 0,
    Length: 0,
    orderId: '',
    userId: ''
  })
  const [token , setToken] = useState()
  const [details , setDetails] = useState()
  const [itemData, setItemData] = useState();
  const [accessToken, setAccessToken] = useState('')
  
  

  const  json = useMemo(() =>  ({
    "data": (scanResultFile.data || scanResultWebCam.data)
  }), [scanResultFile, scanResultWebCam])
 
  
  
  
  const nav = useNavigate();

  const user_details= React.useCallback(async() => {
    // console.log("this is what i need",scanResultFile.data);
    try{
      const response = await axios.post('http://192.168.1.192:85/api/user_details', (scanResultFile || scanResultWebCam))
      const data =  response
      //console.log('1',data);
  
      setDetails(data);
    }
    catch{
      console.log('error in fetching user details');
    }
  }, [scanResultFile,scanResultWebCam])

  const token_generator = React.useCallback(async() => {
  
    try{
      const response = await axios.post(`http://api.djtretailers.com/smartauth/toke-generator/`, json)
    const data =  response;
    // console.log("another one",data.data);
   // console.log('2',data);
  
    // localStorage.setItem("access_token", data.data.access_token)
    setToken(data.data)
    setAccessToken(data.data.access_token)
    // console.log(data.data, 'at');
    }
    catch{
      console.log('error in token generation');
    }
  }, [json]);

  const user_collection = React.useCallback(async() =>{
  
    try{
      const response = await axios.post('http://192.168.1.192:85/api/user_collection', token)
      const data =  response;
      console.log('3',data);
  
    setData(prev => ({
      ...prev,
      userId: data.data.order_id
     }))
    }
    catch{
      console.log('error in getting user collection');
    }
  }, [token]);

  const  itemID_data =  useCallback(async() =>  {
  
    console.log(conData.product_id);
    try{
      const response = await  axios.post('http://api.djtretailers.com/item/adminitems/?page_number=100&page_size=1',{
  
        "export": false,
        "search": "number",
        "value": `${conData.product_id}`,
        "warehouse": "STR01"
      
      }, {
        
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data =  response;
       console.log('6', data);
      setItemData(data.data.data.items);
      setPrice(data.data.data.items[0].warehouses.ASP)
      setData(prev=>({
          ...prev,
            Length: data.data.data.items.length
      }))
      
    }
    catch(err){
      console.log(err);
    }
  }, [conData, setPrice]);

const  barcode_data = useCallback(async() => {
    try{
      const response = await  axios.get(`http://api.djtretailers.com/collection/getsingleitem?search=barcode&value=${conData.product_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data =  response;
      // console.log(conData.product_id);
        console.log('5',data);
      // setMainData(data.data.data.items);
      // setPrice(data.data.data.items[0].warehouses.ASP)
      // setData(prev=>({
      //     ...prev,
      //       Length: data.data.data.items.length
      // }))
    }
    catch{
      console.log('error in getting wallet details');
    }
  }, [accessToken, conData])


  useEffect(() => {
   

    
      barcode_data();
      itemID_data();
      user_details();
      token_generator();
      user_collection();
    
    // wallet_details();

      // wallet_details();

    
    
  }, [conData])

  useEffect(() => {

    // var lst = localStorage.getItem()
    
  // let id = (scanResultFile || scanResultWebCam).data.user_id;
  // let mobile = (scanResultFile || scanResultWebCam).data.mobile;
  // let name = (scanResultFile || scanResultWebCam).data.name;
  // let email = (scanResultFile || scanResultWebCam).data.email;
  // let notify = (scanResultFile || scanResultWebCam).data.notification_token;
  // let member = (scanResultFile || scanResultWebCam).data.is_member;
  // let memberId = (scanResultFile || scanResultWebCam).data.membership_id;
  // let freeItem = (scanResultFile || scanResultWebCam).data.membership_with_free_items;
  //   localStorage.setItem("user_id", id )
  //   localStorage.setItem("mobile", mobile )
  //   localStorage.setItem("name", name )
  //   localStorage.setItem("email", email )
  //   localStorage.setItem("notify", notify )
  //   localStorage.setItem("member", member )
  //   localStorage.setItem("memberId", memberId )
  //   localStorage.setItem("freeItem",freeItem )

  const rate = localStorage.getItem('rate');
  setBalance(rate);
  
  window.onload = () => nav('/')
       
  }, [setBalance, nav]);
  
  useEffect(() =>{

    const calculateTotal = ()=> {


      let sum =0;
      let sumAsp = 0;
      let sumMrp = 0;
    
      let total = dbData?.data.order_data.item_data.reduce((prevValue , currentValue) => {
      let rates = prevValue?.item_total;
      let itemTotal = currentValue?.item_total ;
      let mrpTotal = currentValue?.unit_price.mrp * currentValue?.fulfilled_quantity
      let aspTotal = currentValue?.unit_price.asp * currentValue?.fulfilled_quantity;
      sumAsp += aspTotal
      sumMrp += mrpTotal;
      sum += itemTotal;
      console.log(sum, sumAsp, sumMrp);
    
      
      return ({sum, sumAsp, sumMrp}) 
    }, {rates: 0, currentValue: 0})
     
    
      setPricing(prev => ({
        ...prev,
        totalMrp: total?.sumMrp,
        totalAsp: total?.sumAsp,
        totalSp: total?.sum
      }))
    }

    calculateTotal();
    return() => {
      calculateTotal();
    }
    
  }, [dbData, setPricing])





// async function wallet_details() {
//   try{
//     const response = await  axios.get(`http://dev.djtretailers.com/v2/wallet/admin/mobile?mobile=9999999999`,{mode: 'cors'},{
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       },
//       withCredentials: 'true'
//     })
//     const data =  response;
//     // console.log('4',data);
//     // console.log(accessToken);
//   setData(prev => ({
//     ...prev,
//     orderId: data.data.order_id
//    }))
//   }
//   catch{
//     console.log('error in getting wallet details');
//   }
// }



// ---> Firebase 

  // const idIsHere =(id) =>{
  //   setDbId(id)
  // }


//  const priceQuanFunc =(data) =>{
//   // console.log(data,'two');
//   data.map((val) => {
//     const order = val.data.orders
//     if(order) {
//       const pricing = order.reduce((each, orders) => {
        
//         each['total'] += orders.itemPrice * orders.quantity
//         each['quantity'] += orders.quantity
//         return each
//       },{'total':0,'quantity':0})
//       //  console.log(each.data)
//       val.data['totalPrice'] = pricing['total']
//       val.data['totalQty'] = pricing['quantity']
//        return(
//         <>

//         {setPrice( val.data.totalPrice)}
//         {setData(prev => ({
//           ...prev, Qty: val.data.totalQty
//         }))}
//         </>
//        )
//     }
//     else{
//       val.data['totalPrice'] = 0
//       val.data['totalQty'] = 0
//     }
//       })
//  }
//  const getId = (data) =>{
//    //console.log(data,'getid');
//   const arr =[];
//   Object.keys(data).map((val)=>(
//     //console.log('val' ,val);
//    arr.push({
//     'id': val,
//     'data': data[val]
//      })
    
//   ))
//   //console.log(arr);
//   priceQuanFunc(arr)
// }

// const orderId =(data) =>{
//   // console.log(data,'this');
//   // console.log(data.orders, 'check');
//  return (
//   setData(prev => ({
//     ...prev, Orders:data.orders})),
//   setData(prev => ({
//     ...prev, Length: data.orders.length
//   }))
//  )
// }
  // useEffect(() =>{
  //   const rtDb = ref(db, 'dummydata/customers' );
  //   onValue(rtDb, (snapshot) => {
  //     const data = snapshot.val();
  //   //  console.log(data,'previos');
  //    getId(data)
  //    console.log("main data1",mainData);
  //   });
  // },[db])

  // useEffect(() =>{
  //   const rtDb = ref(db, `dummydata/customers/${id}` );
  //   onValue(rtDb, (snapshot) => {
  //     const data = snapshot.val();
  //    orderId(data)
  //   });
  // },[db, scanResultFile, scanResultWebCam,id])
//  const db = database; 


  return (
    <div >

   
      <header className='header flex sm:flex-row relative justify-center items-center'>
        
          <h1 className='flex relative justify-start sm:pl-4 text-sm sm:text-lg font-bold'> {(scanResultFile || scanResultWebCam) ? `Hi ${(scanResultFile.data.name || scanResultWebCam.data.name)}` : "Qr Not Found"}</h1>
          <img src={require('../assets/Deerika_hunapstudio-01.png')} alt='deerika logo' className='img w-36 sm:w-60' ></img>
          <h1 className='flex flex-col text-center sm:flex-row relative justify-end text-sm items-center sm:text-lg font-bold'> 
          <img src={require('../assets/wallet-3.png') } alt="wallet" className='sm:mr-3'></img>Wallet Balance 
            <span className='text-green-700 m-1 text-2xl mr-2 sm:ml-4'>
            ₹{balance}
            </span>
          </h1>

      </header>
      <main className=''>
         {(scanResultFile || scanResultWebCam) ? <ModalValue orders={itemData} dbData={dbData} setDbData={setDbData} item_data={itemID_data} userId={data.userId} barcodeData={conData} price={price} length={data.Length} />: <h1 className='absolute flex left-0 right-0 top-28 '>Qr Code Not Found!</h1> 
         }
      </main>
      <footer className='footer flex-col flex sm:flex-row'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-sm  sm:text-2xl sm:mr-20 xl:mr-20'>Cart Total Balance ₹ {(scanResultFile || scanResultWebCam) || conData.quantity > '0'? pricing.totalSp : 's'}</h1>
            <h1 className='font-bold text-sm  sm:text-2xl sm:mr-20 xl:mr-20 '>Total Saving ₹  <span className='text-green-600'>{(scanResultFile || scanResultWebCam) && Math.round(pricing.totalMrp - pricing.totalAsp)}</span></h1>
        </div>
        <div>
          {(scanResultFile || scanResultWebCam) ? <Link to='/payment'  className='bg-black hover:bg-white hover:text-black text-white w-48 h-10 sm:h-12 rounded-full p-1 flex justify-center items-center'>Proceed to pay
          <KeyboardArrowRightIcon className=' ml-4 bg-yellow-500 rounded-full  hover:bg-white hover:text-yellow-500' sx={{height: 30 ,width: 30,}} /></Link>
          : ''}
        </div>
      </footer>
    </div>
  )
}
export default Orders