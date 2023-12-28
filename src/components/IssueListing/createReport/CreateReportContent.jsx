import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import CloseIcon from '@mui/icons-material/Close'
import { useFormik } from 'formik'
import CustomSelect from '../../shared/common/CustomSelect'
import * as Yup from 'yup'

const CreateReportContent = ({ issue }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

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

  const options = [
    { value: '1', label: 'Ranjeet' },
    { value: '2', label: 'Dilip' }
  ]
  const product = [
    { value: 1, label: 'Finace' },
    { value: 2, label: 'Product' }
  ]

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }
  const validationSchema = Yup.object().shape({
    jira_id: Yup.string().required('Jira ID is required'),
    customer_name: Yup.string().required('Customer Name is required'),
    expert_name: Yup.string().required('Expert Name is required'),
    creator_name: Yup.string().required('Creator Name is required'),
    product: Yup.object().shape({
      value: Yup.number().required('Product is required'),
      label: Yup.string()
    }),
    capability: Yup.object().shape({
      value: Yup.number().required('Capability is required'),
      label: Yup.string()
    }),
    sub_capability: Yup.object().shape({
      value: Yup.number().required('Sub capability is required'),
      label: Yup.string()
    })
  })

  const formik = useFormik({
    initialValues: {
      jira_id: issue?.jira_id || '',
      customer_name: issue?.customer_name || '',
      expert_name: issue?.expert_name || '',
      creator_name: issue?.creator_name || '',
      product: null,
      capability: null,
      sub_capability: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    }
  })
  const a = false
  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
          }}
        >
          <Box sx={{ width: 550 }}>
            <div className={`create-report-wrapper ${formik.touched.jira_id && formik.errors.jira_id ? 'red-bg' : 'green-bg'}`}>
              <div className="">Jira ID</div>
              <div className="">
                <input
                  type="text"
                  name="jira_id"
                  value={formik.values.jira_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    border: formik.touched.jira_id && formik.errors.jira_id ? '2px solid red' : ''
                  }}
                  readOnly
                />
                {formik.touched.jira_id && formik.errors.jira_id && <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.jira_id}</div>}
              </div>
            </div>
            <div className="create-report-wrapper red-bg">
              <div>
                <div className="required">Menu Card</div>
                <div>Couldn't Identify Menu Card ID</div>
              </div>
              <div className="">
                <CustomSelect options={options} value={selectedOption} onChange={handleChange} placeholder="Unassigned" />
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.customer_name && formik.errors.customer_name ? 'red-bg' : 'green-bg'}`}>
              <div>Customer Name</div>
              <div>
                <input
                  type="text"
                  name="customer_name"
                  value={formik.values.customer_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    border: formik.touched.customer_name && formik.errors.customer_name ? '2px solid red' : ''
                  }}
                />
                {formik.touched.customer_name && formik.errors.customer_name && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.customer_name}</div>
                )}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.expert_name && formik.errors.expert_name ? 'red-bg' : 'green-bg'}`}>
              <div className="">Expert</div>
              <div>
                <input
                  type="text"
                  name="expert_name"
                  value={formik.values.expert_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    border: formik.touched.expert_name && formik.errors.expert_name ? '2px solid red' : ''
                  }}
                />
                {formik.touched.expert_name && formik.errors.expert_name && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.expert_name}</div>
                )}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.creator_name && formik.errors.creator_name ? 'red-bg' : 'green-bg'}`}>
              <div>Creator</div>
              <div>
                <input
                  type="text"
                  name="creator_name"
                  value={formik.values.creator_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    border: formik.touched.creator_name && formik.errors.creator_name ? '2px solid red' : ''
                  }}
                />
                {formik.touched.creator_name && formik.errors.creator_name && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.creator_name}</div>
                )}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.product && formik.errors.product ? 'red-bg' : 'green-bg'}`}>
              <div>Product</div>
              <div>
                <CustomSelect
                  options={product}
                  value={formik.values.product}
                  onChange={(value) => formik.setFieldValue('product', value)}
                  placeholder="Unassigned"
                />
                {formik.touched.product && formik.errors.product && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.product.label}</div>
                )}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.capability && formik.errors.capability ? 'red-bg' : 'green-bg'}`}>
              <div>Capability</div>
              <div>
                <CustomSelect
                  options={product}
                  value={formik.values.capability}
                  onChange={(value) => formik.setFieldValue('capability', value)}
                  placeholder="Unassigned"
                />
                {formik.touched.capability && formik.errors.capability && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.capability.label}</div>
                )}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.capability && formik.errors.capability ? 'red-bg' : 'green-bg'}`}>
              <div>Sub Capability</div>
              <div>
                <CustomSelect
                  options={product}
                  value={formik.values.sub_capability}
                  onChange={(value) => formik.setFieldValue('sub_capability', value)}
                  placeholder="Unassigned"
                />
                {formik.touched.sub_capability && formik.errors.sub_capability && (
                  <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.capability.label}</div>
                )}
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
                <Button variant="contained" type="submit" disabled={!formik.isValid}>
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
