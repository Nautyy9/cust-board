import Qr from "./components/Qr.jsx";
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import {  useState } from "react";
import Orders from "./components/Orders.jsx";
import NotFound from "./components/NotFound.jsx";
import Payment from "./components/Payment.jsx";
import Success from './components/Success'
import Context from "./Context.jsx";

function App() {

  
  
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [balance , setBalance] = useState(90000)
  const [pricing, setPricing] = useState({
    totalSp: 0,
    totalAsp: 0,
    totalMrp : 0
  })
  const [dbData, setDbData] = useState();
  return (
    
      <Context>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Qr scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam}/>}/>
        <Route path="/orders" element={<Orders dbData={dbData} setDbData={setDbData} pricing={pricing} setPricing={setPricing} balance={balance} setBalance={setBalance} scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam} />}></Route>
        <Route path='/payment' element={<Payment dbData={dbData} setDbData={setDbData} pricing={pricing} setPricing={setPricing} balance={balance} setBalance={setBalance} scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam} />}></Route>
        <Route path='/payment/success' element={<Success balance={balance} setBalance={setBalance}></Success>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
      </Context>
    
  );
}

export default App;
