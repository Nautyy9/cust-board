import React, {useState, useRef, useContext} from 'react';
import {useNavigate} from "react-router-dom"
import QrReader from 'react-qr-reader';
import { Button, Card} from '@mui/material';
import { ApisContext } from '../Context';



function Qr({scanResultWebCam, scanResultFile, setScanResultFile,setScanResultWebCam}) { 
  const [state, setState] = useState(false)

  const  values = useContext(ApisContext);
  const {client} = values;
  const nav = useNavigate()

  
  
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
        // console.log(result);
        const val = JSON.parse(result);
        // console.log(val);
          setScanResultFile(val);
          nav('./orders')
          
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    setState(true)
      
    if (result){
        setScanResultWebCam(result);
        // console.log(result);
        nav('./orders')
    }
   }
  return (
    <div className='design my-4  overflow-x-hidden '  >
    <Card className='card-name xl:w-1/4' >
    {console.log(client)}
                         <div className=" flex flex-col items-center justify-center  md:mt-10">
                            <Button className="" variant="contained" color="primary" sx={{mt: 4}} onClick={onScanFile}>Select Qr Code</Button>
                                <QrReader
                                  ref={qrRef}
                                  delay={300}
                                  style={{width: '0%'}}
                                  onError={handleErrorFile}
                                  onScan={handleScanFile}
                                  legacyMode
                              />
                              
                         </div>
                          <div className="flex flex-col items-center justify-center">
                              
                              <QrReader
                              facingMode="user"
                              delay={300}
                               style={{width:'300px', height:'300px',margin:'40px' }}
                              onError={handleErrorWebCam}
                              onScan={handleScanWebCam}
                              />
                              <h3 className='mb-10'>Scanned By WebCam Code: <br/> {state ? (<div>
                                  {scanResultWebCam}
                              </div>) : (<>
                                  <Button variant='contained' className=''  color='error'><b>! Camera Not Found</b></Button>
                              </>)}
                              </h3>
                         
                          </div>
                  </Card>
                  <div className="card-value shadow-sm py-6 rounded-xl w-fit   ">
                    <div className="flex flex-row mb-8">
                      <div
                        className="number flex flex-col m-1 p-1 mr-2 items-center justify-center w-6 h-6 text-md font-semibold rounded-full text-txt">
                        1
                      </div>
                      <p className="text-base font-semibold 2xl:text-xl text-txt">
                        Open Deerika Mobile App, Go to section ???Smart Store"
                      </p>
                    </div>

                    <div className="flex flex-row mb-8">
                      <div
                        className="number flex flex-col items-center m-1 p-1 mr-2 justify-center w-6 h-6  text-md font-semibold rounded-full text-txt">
                        2
                      </div>
                      <p className="text-base font-semibold text-opacity-50 2xl:text-xl text-txt-light">
                        Show that QR Code on this tablet screen.
                      </p>
                    </div>

                    <div className="flex flex-row">
                      <div
                        className="number flex flex-col items-center m-1 p-1  justify-center w-6 h-6 mr-2 text-md font-semibold rounded-full text-txt">
                        3
                      </div>
                      <p className="text-base font-semibold  text-opacity-10 2xl:text-xl text-txt-light">
                        Congratulation, You are now Paired with Smart Cart
                      </p>
                    </div>
                  </div>
                </div>
  );
}


export default Qr;