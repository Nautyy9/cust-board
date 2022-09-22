import { SettingsPowerRounded } from '@mui/icons-material'
import { Avatar, Box, Container, Modal, Rating, Typography, } from '@mui/material'
import React, { useEffect, useRef } from 'react'

function Popup({open, setOpen}) {

  const openRef = useRef();
  // useEffect(() => 
  // {
  //   document.addEventListener('click' , () => {

  //   })
  // })

  function setClose ()  {
    const closeModal  = openRef.current = true
    
    setOpen(closeModal);
  }
 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 200,
    bgcolor: 'background.paper',
    border: '4px solid #000',
    boxShadow: 24,
    p: 4,
    
  };


  return (
    <div className=' '>
        <Modal
        ref={openRef}
        open={open}
        onClose={setClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error in fetching Cart Please try again or reload the page
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            hellow user i don't have any text left to write 
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Popup