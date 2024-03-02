import React, { useState } from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Dialog, DialogContent, DialogActions, Button } from '@mui/material'

const ImageUpload = ({ imgSrc, onSelectImage }) => {
  const [selectedImage, setSelectedImage] = useState(imgSrc)
  const [openModal, setOpenModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file type is jpg, jpeg, or png
      if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
        setErrorMessage('Please upload jpeg, jpg or png image only.');
        return; // Exit the function if the file type is not allowed
      }
      // Check if the file size exceeds 500KB
      if (file.size > 500 * 1024) {
        setErrorMessage('File size must be less than 500KB.');
        return;
      }
  
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Update onSelectImage to handle the file object
      console.log("file2222->",file)
      onSelectImage(file); // Assuming onSelectImage should now handle the file object for upload
      setErrorMessage('');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null)
    onSelectImage(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <div className="upload-image">
        <Box
          className="uploader-wrapper"
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {selectedImage && (
            <div className="uploaded-img-wrapper">
              <IconButton onClick={handleRemoveImage}>
                <CloseIcon />
              </IconButton>
              <img src={selectedImage} alt="Selected Image" onClick={handleOpenModal} className="uploaded-image" />
            </div>
          )}
          {!selectedImage && (
            <>
              <input type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none' }} id="fileInput" onChange={handleFileUpload} />
              <label htmlFor="fileInput" className="fileInput">
                <div className="upload-img-btn">
                  <IconButton
                    component="span"
                    sx={{
                      margin: 2,
                      marginLeft: 8,
                      background: 'rgba(92, 45, 145, 1)',
                      '&:hover': {
                        background: 'rgba(92, 45, 145, 1)'
                      }
                    }}
                  >
                    <FileUploadRoundedIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                </div>
                <span className="upload-txt">Click to Upload</span>
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
      {errorMessage ? <span className="error-msg">{errorMessage}</span> : null}
    </div>
  )
}

export default ImageUpload
