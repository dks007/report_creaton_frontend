import { Box, Button, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomSelect from '../../shared/common/CustomSelect'
import axiosInstance from '../../../axiosInstance/axiosInstance'
import ImageUpload from './ImageUpload'
import RefreshIcon from '@mui/icons-material/Refresh'
import Loader from '../../shared/common/Loader'
import { checkDataInList } from '../../../utils/helperFunction'
import { toast } from 'react-toastify'

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
  const [selectBoxErrors, setSelectBoxErrors] = useState({
    customerName: '',
    customerContact: '',
    product: '',
    menuCard: '',
    capability: '',
    subCapabilities: '',
    logo: ''
  })
  const [logo, setLogo] = useState('')

  const fetchMasterData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`cc6594bc-d43c-44ef-ad2a-78f82b24d84a`)
      // const response = await axiosInstance.get('/get-createreport/${issue}')
      const masterData = response.data.resdata
      console.log('masterdata', masterData)
      setApiData(masterData)
      setLogo(masterData?.logo)
      //options for select box
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
        capabilityOptions: masterData.capability_list?.map((item) => ({
          value: item.name,
          label: item.name,
          subCapabilities: item.sub_capabilities.map((subCap) => subCap.name)
        }))
      }))
      setSelectedValue((prevState) => ({
        ...prevState,
        customerName: checkDataInList(masterData?.customer_name, masterData?.customer_list, 'customer_name'),
        customerContact: { value: masterData?.customer_contact, label: masterData?.customer_contact },
        product: checkDataInList(masterData?.product, masterData?.product_list, 'product_name'),
        menuCard: checkDataInList(masterData?.menu_card, masterData?.menu_card_list, 'menu_card'),
        capability: { value: masterData?.capability, label: masterData?.capability },
        subCapabilities: { value: masterData?.sub_capability, label: masterData?.sub_capability }
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

  // getting sub capability option according to capability
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
  // Handling reset button
  const handleRestButton = () => {
    toast.warn('Data reset successfully')
    setSelectedValue((prevState) => ({
      ...prevState,
      customerName: checkDataInList(apiData?.customer_name, apiData?.customer_list, 'customer_name'),
      customerContact: { value: apiData?.customer_contact, label: apiData?.customer_contact },
      product: checkDataInList(apiData?.product, apiData?.product_list, 'product_name'),
      menuCard: checkDataInList(apiData?.menu_card, apiData?.menu_card_list, 'menu_card'),
      capability: checkDataInList(apiData?.capability, apiData?.capability_list, 'capability'),
      //capability: { value: apiData?.capability, label: apiData?.capability },
      subCapabilities: { value: apiData?.sub_capability, label: apiData?.sub_capability }
    }))
  }

  // handle save button
  const handleSaveButton = async () => {
    let hasErrors = false
    const fieldsToValidate = ['customerName', 'menuCard', 'customerContact', 'product', 'capability', 'subCapabilities']
    // Iterate over fields and set errors if values are missing
    fieldsToValidate.forEach((field) => {
      if (!selectedValue[field]?.value) {
        setSelectBoxErrors((prevState) => ({
          ...prevState,
          [field]: `Please select ${field.replace(/([A-Z])/g, ' $1').trim()}.` // Adds space before capital letters and trims
        }))
        hasErrors = true
      }
    })
    if (!logo) {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        logo: 'Please select image'
      }))
    }

    // Initialize formData at the beginning of the block where it's used
    const formData = new FormData()

    if (!hasErrors) {
      console.log('log upload should object->', logo, logo instanceof File)

      if (logo && logo instanceof File) {
        formData.append('logo', logo) // 'logo' is now a File object
      } else {
        // Handle case where logo is not selected or not a file, potentially setting an error
        setSelectBoxErrors((prevState) => ({
          ...prevState,
          logo: 'Please upload a valid logo file.'
        }))
        return // Prevent the form submission if there's no valid logo file
      }

      formData.append('issue_key', issue)
      formData.append('customer_name', selectedValue.customerName?.value)
      formData.append('customer_contact', selectedValue.customerContact?.value)
      formData.append('expert_name', apiData?.expert_name)
      formData.append('creator_name', apiData?.creator_name)
      formData.append('menu_card', selectedValue.menuCard?.value)
      formData.append('product', selectedValue.product?.value)
      formData.append('capability', selectedValue.capability?.value)
      formData.append('sub_capability', selectedValue.subCapabilities?.value)
      formData.append('snow_case_no', apiData?.snow_case_no)
      formData.append('action', 'saved')
      formData.append('logo', logo) // Here we append the file instead of the blob URL
      formData.append('sdm_name', apiData?.sdm_name)
      formData.append('csm_name', apiData?.csm_name)
      formData.append('sdo_name', apiData?.sdo_name)

      try {
        toast.success('Report creation successfully.')
        const response = await axiosInstance.post('/createreport/', formData)
        // Handle response here, e.g., show success message, navigate, etc.
        console.log('Report creation successful', response.data)
      } catch (error) {
        console.error('Failed to create report', error)
        // Handle error here, e.g., show error message
      }
      console.log('payload', payload)
    }
  }
  // handle create button
  const handleCreateReportButton = () => {
    let hasErrors = false
    const fieldsToValidate = ['customerName', 'menuCard', 'customerContact', 'product', 'capability', 'subCapabilities']
    // Iterate over fields and set errors if values are missing
    fieldsToValidate.forEach((field) => {
      if (!selectedValue[field]?.value) {
        setSelectBoxErrors((prevState) => ({
          ...prevState,
          [field]: `Please select ${field.replace(/([A-Z])/g, ' $1').trim()}.` // Adds space before capital letters and trims
        }))
        hasErrors = true
      }
    })
    if (!logo) {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        logo: 'Please select image'
      }))
    }

    if (!hasErrors) {
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
        action: 'created',
        logo: logo,
        sdm_name: apiData?.sdm_name,
        csm_name: apiData?.csm_name,
        sdo_name: apiData?.sdo_name
      }
      console.log('payload', payload)
    }
  }

  console.log('logogg', logo)
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        customerName: ''
                      }))
                    }}
                  />
                </div>
                {selectBoxErrors.customerName && <span className="error-msg">{selectBoxErrors.customerName}</span>}
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        menuCard: ''
                      }))
                    }}
                  />
                </div>
                {selectBoxErrors.menuCard && <span className="error-msg">{selectBoxErrors.menuCard}</span>}
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        customerContact: ''
                      }))
                    }}
                  />
                </div>
                {selectBoxErrors.customerContact && <span className="error-msg">{selectBoxErrors.customerContact}</span>}
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        product: ''
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        capability: ''
                      }))
                    }}
                  />
                </div>
                {selectBoxErrors.capability && <span className="error-msg">{selectBoxErrors.capability}</span>}
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
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        subCapabilities: ''
                      }))
                    }}
                  />
                </div>
                {selectBoxErrors.subCapabilities && <span className="error-msg">{selectBoxErrors.subCapabilities}</span>}
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
                <div>
                  <ImageUpload
                    imgSrc={logo}
                    onSelectImage={(file) => {
                      setLogo(file)
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        logo: ''
                      }))
                    }}
                  />
                  {selectBoxErrors.logo && <span className="error-msg">{selectBoxErrors.logo}</span>}
                </div>
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
