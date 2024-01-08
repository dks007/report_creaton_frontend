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
      <Box
        sx={{
          position: 'relative',
          borderRadius: 2,
          border: '1px dashed gray',
          width: '200px',
          height: '100px',
          overflow: 'hidden'
        }}
      >
        {selectedImage && (
          <>
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 0.5,
                background: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)'
                }
              }}
            >
              <CloseIcon sx={{ color: '#503998' }} />
            </IconButton>
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                cursor: 'pointer'
              }}
              onClick={handleOpenModal}
            />
          </>
        )}
        {!selectedImage && (
          <>
            <input type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none' }} id="fileInput" onChange={handleFileUpload} />
            <label htmlFor="fileInput">
              <IconButton component="span" sx={{ margin: 2, marginLeft: 8, background: '#503998' }}>
                <FileUploadRoundedIcon sx={{ color: 'white' }} />
              </IconButton>
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
              top: 0,
              right: 0,
              padding: 0.5,
              background: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)'
              }
            }}
          >
            <CloseIcon sx={{ color: '#503998' }} />
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
