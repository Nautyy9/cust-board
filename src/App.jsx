import Qr from "./components/Qr.jsx";
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import { useContext,  useState } from "react";
import Orders from "./components/Orders.jsx";
import NotFound from "./components/NotFound.jsx";
import Payment from "./components/Payment.jsx";
import Success from './components/Success'
import Context from "./Context.jsx";

function App() {

  
  const [price , setPrice] = useState()
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [rate , setRate] = useState(90000)

  return (
    
      <Context>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Qr scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam}/>}/>
        <Route path="/orders" element={<Orders rate={rate} setRate={setRate} scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam} price={price} setPrice ={setPrice}/>}></Route>
        <Route path='/payment' element={<Payment rate={rate} setRate={setRate} scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam} price={price} setPrice ={setPrice}/>}></Route>
        <Route path='/payment/success' element={<Success rate={rate} setRate={setRate}></Success>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
      </Context>
    
  );
}

export default App;
