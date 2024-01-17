import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const CustomModal = ({ handleClose, open, width, children }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'hidden',
    borderRadius: 1.5
  }
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className='modal-wrapper'>{children}</Box>
      </Modal>
    </div>
  )
}
export default CustomModal
