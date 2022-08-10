import React from 'react'

function Orders({scanResultFile,scanResultWebCam }) {
  return (
    <div >
    <header className='header'>
        <h1>{scanResultFile}</h1>
        <h1>{scanResultWebCam}</h1>
        <img src='../../public/assets/64787-success 1.png' alt="oneto" style={{width: '300px', height:'max-content' }}></img>
    </header>
        <footer className='footer space-x-10'>
            <h1>This is footer tag</h1>
        </footer>
    </div>
  )
}
export default Orders