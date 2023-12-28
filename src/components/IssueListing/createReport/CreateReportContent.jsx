import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import CloseIcon from '@mui/icons-material/Close'
import Dropdown from '../../shared/common/Dropdown'
import { useFormik } from 'formik'
import { createReportSchema } from '../../../constants/validationSchema'

const CreateReportContent = ({ issue }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const pVlaue = [
    { value: 'finance', label: 'Finance' },
    { value: 'expert', label: 'Expert' },
    { value: 'marketing', label: 'Marketing' }
  ]

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

  const handleInputChange = (event) => {
    console.log('aaaaa', event.target.value)
  }
  const a = false
  return (
    <div>
      <form noValidate>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
          }}
        >
          <Box sx={{ width: 550 }}>
            <div className="create-report-wrapper red-bg">
              <div className="">Jira ID</div>
              <div className="">
                <input type="text" name="jira_id" value={issue?.jira_id} />
              </div>
            </div>
            <div className="create-report-wrapper green-bg">
              <div>
                <div className="required">Menu Card</div>
                <div>Couldn't Identify Menu Card ID</div>
              </div>
              <div className="">
                <input type="text" name="menu_id" defaultValue={issue.menu_id} onChange={handleInputChange} />
              </div>
            </div>
            <div className={`create-report-wrapper ${a == true ? 'red-bg' : 'green-bg'}`}>
              <div>Customer Name</div>
              <div>
                <input type="text" name="customer_name" />
              </div>
            </div>
            <div className="create-report-wrapper red-bg">
              <div className="col-md-6">Expert</div>
              <div>
                <input type="text" name="expert_name" defaultValue="SAT PAL" onChange={handleInputChange} />
              </div>
            </div>
            <div className="create-report-wrapper red-bg">
              <div>Creator</div>
              <div>
                <input type="text" name="creator" defaultValue="Kendrion Gmbh" onChange={handleInputChange} />
              </div>
            </div>
            <div className="create-report-wrapper grrren-bg">
              <div>Product</div>
              <div>
                <Dropdown options={pVlaue} onSelect={(e) => console.log(e)} />
              </div>
            </div>
            <div className="create-report-wrapper red-bg ">
              <div>Capability</div>
              <div>
                <input type="text" name="capability" defaultValue="Purchasing" onChange={handleInputChange} />
              </div>
            </div>
            <div className="create-report-wrapper green-bg">
              <div>Sub Capability</div>
              <div>
                <input type="text" name="sub_capability" defaultValue="Purchase Order" onChange={handleInputChange} />
              </div>
            </div>
            <div className="create-report-wrapper red-bg">
              <div>Customer Logo</div>
              <div>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    border: '1px dashed gray',
                    width: '200px',
                    maxheight: '200px',
                    overflow: 'hidden'
                  }}
                >
                  {selectedImage && (
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <CloseIcon sx={{ color: '#503998' }} />
                    </IconButton>
                  )}
                  {selectedImage ? (
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
                  ) : (
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
              </div>
            </div>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ padding: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 400
              }}
            >
              <IconButton>
                <HelpOutlineIcon sx={{ color: '#503998' }} fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                Please make sure you are creating the document for correct Jira ID
              </Typography>
              <Box sx={{ marginTop: 4, gap: 2, display: 'flex' }}>
                <Button variant="outlined">Not Sure</Button>
                <Button variant="contained" sx={{}}>
                  I am sure
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default CreateReportContent
