import { Box, Button, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomSelect from '../../shared/common/CustomSelect'
import axiosInstance from '../../../axiosInstance/axiosInstance'
import ImageUpload from './ImageUpload'
import RefreshIcon from '@mui/icons-material/Refresh'
import Loader from '../../shared/common/Loader'

const CreateReportContent = ({ issue, onClose }) => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    customerOptions: [],
    customerContact: [],
    productOptions: [],
    menuCardOptions: [],
    capabilityOptions: []
  })
  const [selectedValue, setSelectedValue] = useState({
    customerName: null,
    customerContact: null,
    product: null,
    menuCard: null,
    capability: null,
    subCapabilities: null
  })
  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState()

  const fetchMasterData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`050ab537-4129-446a-8bca-c2a157141bc3`)
      const masterData = response.data.resdata
      console.log('cus', masterData)
      setApiData(masterData)
      setSelectBoxOptions((prevState) => ({
        ...prevState,
        customerOptions: masterData.customer_list.map((item) => ({
          value: item.customer_name,
          label: item.customer_name
        })),
        customerContact: masterData.customer_contact_list.map((item) => ({
          value: item.customer_contact,
          label: item.customer_contact
        })),
        menuCardOptions: masterData.menu_card_list.map((item) => ({
          value: item.menu_card,
          label: item.menu_card
        })),
        productOptions: masterData.product_list.map((item) => ({
          value: item.product_name,
          label: item.product_name
        })),
        capabilityOptions: masterData.capsubcap_list?.map((item) => ({
          value: item.name,
          label: item.name,
          subCapabilities: item.sub_capabilities.map((subCap) => subCap.name)
        }))
      }))
      setSelectedValue((prevState) => ({
        ...prevState,
        customerName: { value: masterData?.customer_name, label: masterData?.customer_name },
        customerContact: { value: masterData?.customer_contact, label: masterData?.customer_contact },
        product: { value: masterData?.product, label: masterData?.product },
        menuCard: { value: masterData?.menu_card, label: masterData?.menu_card },
        capability: { value: masterData?.capability, label: masterData?.capability }
      }))

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchMasterData()
  }, [])

  const getSubCapabilityOptions = () => {
    if (selectedValue.capability) {
      const capability = selectBoxOptions.capabilityOptions.find((opt) => opt.value === selectedValue.capability.value)
      return capability
        ? capability.subCapabilities.map((subCap) => ({
            label: subCap,
            value: subCap
          }))
        : []
    }
    return []
  }
  const handleRestButton = () => {
    setSelectedValue((prevState) => ({
      ...prevState,
      customerName: { value: apiData?.customer_name, label: apiData?.customer_name },
      customerContact: { value: apiData?.customer_contact, label: apiData?.customer_contact },
      product: { value: apiData?.product, label: apiData?.product },
      menuCard: { value: apiData?.menu_card, label: apiData?.menu_card },
      capability: { value: apiData?.capability, label: apiData?.capability }
    }))
  }
  const validateSelectBox = (selectedOption, selectBoxName) => {
    if (!selectedOption.value) {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        [selectBoxName]: 'Please select an option'
      }))
      return false
    }
    setSelectBoxErrors((prevState) => ({
      ...prevState,
      [selectBoxName]: ''
    }))
    return true
  }
  const payload = {
    issue_key: issue,
    customer_name: selectedValue.customerName?.value,
    customer_contact: selectedValue.customerContact?.value,
    expert_name: apiData?.expert_name,
    creator_name: apiData?.creator_name,
    menu_card: selectedValue.menuCard?.value,
    product: selectedValue.product?.value,
    capability: selectedValue.capability?.value,
    sub_capability: selectedValue.subCapabilities?.value,
    snow_case_no: apiData?.snow_case_no,
    action: 'saved',
    logo: 'sss',
    sdm_name: apiData?.sdm_name,
    csm_name: apiData?.csm_name,
    sdo_name: apiData?.sdo_name
  }
  const handleSaveButton = () => {
    console.log('payload', payload)
  }
  const handleCreateReportButton = () => {}
  return (
    <div>
      <form>
        <Box
          className="main-form-wrapper"
          sx={{
            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
          }}
        >
          {loading && <Loader />}
          <Box className="container" sx={{ width: 550 }}>
            <div className="row readonly-info">
              <div className="info-left">
                <div className="label">
                  Jira ID: <span>{issue}</span>
                </div>
                <div className="label">
                  Expert: <span>{apiData?.expert_name}</span>
                </div>
              </div>
              <div className="refresh-btn" onClick={handleRestButton}>
                <RefreshIcon />
                <span>Reset Default</span>
              </div>
            </div>
            <div className="row">
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="label">Customer Name</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.customerOptions}
                    placeholder="Select Customer"
                    value={selectedValue.customerName}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        customerName: selectedOption
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div>
                  <div className="required label">Menu Card</div>
                </div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.menuCardOptions}
                    placeholder="Select Menu Card"
                    value={selectedValue.menuCard}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        menuCard: selectedOption
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="label">Customer Contact</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.customerContact}
                    placeholder="Select Contact"
                    value={selectedValue.customerContact}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        customerContact: selectedOption
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Product</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.productOptions}
                    placeholder="Select Product"
                    value={selectedValue.product}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        product: selectedOption
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper `}>
                <div className="required label">Capability</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.capabilityOptions}
                    placeholder="Select Capability"
                    value={selectedValue.capability}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        capability: selectedOption,
                        subCapabilities: null
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Sub Capability</div>
                <div className="custom-select">
                  <CustomSelect
                    options={getSubCapabilityOptions()}
                    placeholder="Select Sub Capability"
                    value={selectedValue.subCapabilities}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        subCapabilities: selectedOption
                      }))
                    }}
                  />
                </div>
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Snow Case ID</div>
                <div>
                  <input type="text" name="snow_case_no" value={apiData?.snow_case_no} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="create-report-wrapper green-bg">
                <div className="image-upload-text">
                  <h5>Customer Logo</h5>
                  <p>Please upload a Customer logo, file format should be “JPG, JPEG, PNG, and file size should be greater than 500KB</p>
                </div>
                <div className="upload-image">
                  <ImageUpload imgSrc="https://1000logos.net/wp-content/uploads/2021/04/Accenture-logo.png" />
                </div>
                <span className="error-msg">Please upload the customer's logo according to the guidelines provided above.</span>
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
                <img src="src/assets/Images/create-report-icon.svg" alt="Create report image" />
              </IconButton>
              <p className="text-center">Please make sure you are creating the document for the correct Jira ID</p>
              <Box className="popup-action-button">
                <Button variant="outlined" onClick={handleSaveButton}>
                  Save
                </Button>
                <Button variant="contained" onClick={handleCreateReportButton}>
                  Create Report
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
