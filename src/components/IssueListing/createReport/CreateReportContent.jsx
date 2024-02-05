import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useFormik } from 'formik'
import CustomSelect from '../../shared/common/CustomSelect'
import * as Yup from 'yup'
import { createReportValidationSchema } from '../../../constants/validationSchema'
import ImageUpload from './ImageUpload'

const CreateReportContent = ({ issue, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const menuCardOptions = [
    { value: 1, label: 'QSM1' },
    { value: 2, label: 'EMA1' },
    { value: 3, label: 'TAA2' }
  ]
  const productOption = [
    { value: 1, label: 'IFS Cloud' },
    { value: 2, label: 'IFS Applications' },
    { value: 3, label: 'Planning and Scheduling Optimization - Track' }
  ]
  const capabilityOption = [
    { value: 1, label: 'Platform' },
    { value: 2, label: 'Service Management' },
    { value: 3, label: 'undefined' }
  ]
  const subCapabilityOption = [
    { value: 1, label: 'sub-Platform' },
    { value: 2, label: 'sub-Service Management' }
  ]

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }

  const formik = useFormik({
    initialValues: {
      jira_id: issue?.jira_id || '',
      customer_name: issue?.customer_name || '',
      expert_name: issue?.expert_name || '',
      creator_name: issue?.creator_name || '',
      menuCard: null,
      product: null,
      capability: null,
      sub_capability: null
    },
    validationSchema: createReportValidationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Box
          className="main-form-wrapper"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
          }}
        >
          <Box sx={{ width: 550 }}>
            <div className={`create-report-wrapper ${formik.touched.jira_id && formik.errors.jira_id ? 'red-bg' : 'readonly-item'}`}>
              <div className="label">Jira ID</div>
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
                />
                {formik.touched.jira_id && formik.errors.jira_id && <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.jira_id}</div>}
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.menuCard && formik.errors.menuCard ? 'red-bg' : 'green-bg'}`}>
              <div>
                <div className="required label">Menu Card</div>
                <div className="help-text">Couldn't Identify Menu Card ID</div>
              </div>
              <div className="custom-select">
                <CustomSelect
                  options={menuCardOptions}
                  placeholder="Unassigned"
                  value={formik.values.menuCard}
                  onChange={(value) => {
                    handleChange(value)
                    formik.setFieldValue('menuCard', value)
                  }}
                />
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.customer_name && formik.errors.customer_name ? 'red-bg' : 'green-bg'}`}>
              <div className="label">Customer Name</div>
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
            <div className={`create-report-wrapper ${formik.touched.expert_name && formik.errors.expert_name ? 'red-bg' : 'readonly-item'}`}>
              <div className="label">Expert</div>
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
              <div className="label">Creator</div>
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
              <div className="required label">Product</div>
              <div className="custom-select">
                <CustomSelect
                  options={productOption}
                  value={formik.values.product}
                  onChange={(value) => {
                    handleChange(value)
                    formik.setFieldValue('product', value)
                  }}
                  placeholder="Unassigned"
                />
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.capability && formik.errors.capability ? 'red-bg' : 'green-bg'}`}>
              <div className="required label">Capability</div>
              <div className="custom-select">
                <CustomSelect
                  options={capabilityOption}
                  value={formik.values.capability}
                  onChange={(value) => {
                    handleChange(value)
                    formik.setFieldValue('capability', value)
                  }}
                  placeholder="Unassigned"
                />
              </div>
            </div>
            <div className={`create-report-wrapper ${formik.touched.sub_capability && formik.errors.sub_capability ? 'red-bg' : 'green-bg'}`}>
              <div className="required label">Sub Capability</div>
              <div className="custom-select">
                <CustomSelect
                  options={subCapabilityOption}
                  value={formik.values.sub_capability}
                  onChange={(value) => {
                    handleChange(value)
                    formik.setFieldValue('sub_capability', value)
                  }}
                  placeholder="Unassigned"
                />
              </div>
            </div>
            <div className="create-report-wrapper green-bg">
              <div className="image-upload-text">
                <h5>Customer Logo</h5>
                <p>No logo found, please upload a Customer logo, file format should be “JPG, JPEG, PNG. </p>
                <span>File size should be grater then 500KB</span>
              </div>
              <div className="upload-image">
                <ImageUpload imgSrc="https://1000logos.net/wp-content/uploads/2021/04/Accenture-logo.png" />
              </div>
            </div>
          </Box>
          <Box orientation="vertical" className="center-part"></Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }} className="right-text-area">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 400
              }}
            >
              <IconButton className="question-icon">
                <HelpOutlineIcon style={{ fontSize: 50 }} />
              </IconButton>
              <p className="text-center">Please make sure you are creating the document for correct Jira ID</p>
              <Box className="popup-action-button">
                <Button variant="outlined" onClick={onClose}>
                  Not Sure
                </Button>
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
