
import React, { useState } from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Dialog, DialogContent, DialogActions, Button } from '@mui/material'

const ImageUpload = ({ imgSrc }) => {
  const [selectedImage, setSelectedImage] = useState(imgSrc)
  const [openModal, setOpenModal] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Box className='uploader-wrapper'
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        {selectedImage && (
          <div className='uploaded-img-wrapper'>
            <IconButton onClick={handleRemoveImage}>
              <CloseIcon/>
            </IconButton>
            <img src={selectedImage} alt="Selected Image" onClick={handleOpenModal} className='uploaded-image'/>
          </div>
        )}
        {!selectedImage && (
          <>
            <input type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none' }} id="fileInput" onChange={handleFileUpload} />
            <label htmlFor="fileInput" className='fileInput'>
              <div className='upload-img-btn'>
                <IconButton component="span" sx={{ margin: 2, marginLeft: 8, background: 'rgba(92, 45, 145, 1)',
              '&:hover': {
                background: 'rgba(92, 45, 145, 1)'
              } }}>
                  <FileUploadRoundedIcon sx={{ color: '#ffffff' }} />
                </IconButton>     
              </div>         
              <span className='upload-txt'>Click to Upload</span>
            </label>
          </>
        )}
      </Box>

      <Dialog open={openModal} onClose={null}>
        <DialogContent sx={{ padding: 0, margin: 0, minWidth: '400px', maxWidth: '600px', height: 'auto', minHeight: '300px' }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: 0.5,
              background: 'rgba(92, 45, 145, 0.2)',
              '&:hover': {
                background: 'rgba(92, 45, 145, 0.8)'
              }
            }}
          >
            <CloseIcon sx={{ color: '#fff' }} />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImageUpload

