import Qr from "./components/Qr.jsx";
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import { useState } from "react";
import Orders from "./components/Orders.jsx";

function App() {
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Qr scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam}/>}/>
      <Route path="/orders" element={<Orders scanResultFile={scanResultFile} setScanResultFile={setScanResultFile} scanResultWebCam={scanResultWebCam} setScanResultWebCam={setScanResultWebCam}/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
