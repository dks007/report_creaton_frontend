import { Box, Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import CustomSelect from "../../shared/common/CustomSelect";
import axiosInstance from "../../../axiosInstance/axiosInstance";
import ImageUpload from "./ImageUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import { createReportValidationSchema } from "../../../constants/validationSchema";
import Loader from "../../shared/common/Loader";

const CreateReportContent = ({ issue, onClose }) => {
  const [subCapabilities, setSubCapabilities] = useState([]);
  const [capabilityOptions, setCapabilityOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [menuCardOptions, setMenuCardOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [customerContact, setCustomerContact] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [selectedSubCapability, setSelectedSubCapability] = useState(null);
  const [apiData, setApiData] = useState();

  const formik = useFormik({
    initialValues: {
      jira_id: "", // Will be populated dynamically
      customer_name: "",
      customer_contact: "",
      expert_name: "",
      creator_name: "",
      menuCard: "",
      product: "",
      capability: "",
      sub_capability: "",
      snow_case_no: "",
      action: "create",
      customer_logo: null,
    },
    validationSchema: createReportValidationSchema,
    onSubmit: async (values) => {
      try {
        // Post form data to the API endpoint
        // await axiosInstance.post("/api/report1/", values);
        // // Handle success scenario, e.g., show a success message
        // onClose(); // Close modal after successful submission
        console.log("value",values)
      } catch (error) {
        // Handle error scenario, e.g., show an error message
        console.error("Error while saving data:", error);
      }
    },
  });

  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/get-createreport/${issue}`);
      const masterData = response.data.resdata;
      setApiData(masterData);
      formik.setValues({
        jira_id: issue,
        customer_name: {
          value: masterData.customer_name,
          label: masterData.customer_name,
        },
        menuCard: { value: masterData.menu_card, label: masterData.menu_card },
        customer_contact: {
          value: masterData.customer_contact,
          label: masterData.customer_contact,
        },
        product: { value: masterData.product, label: masterData.product },
        capability: {
          value: masterData.capability,
          label: masterData.capability,
        },
        expert_name: masterData.expert_name,
        creator_name: masterData.creator_name,
        snow_case_no: masterData.snow_case_no,
      });
      // Set master data options
      setCapabilityOptions(
        masterData.capsubcap_list.map((item) => ({
          value: item.name,
          label: item.name,
          subCapabilities: item.sub_capabilities.map((subCap) => subCap.name),
        }))
      );
      setProductOptions(
        masterData.product_list.map((item) => ({
          value: item.product_name,
          label: item.product_name,
        }))
      );
      setMenuCardOptions(
        masterData.menu_card_list.map((item) => ({
          value: item.menu_card,
          label: item.menu_card,
        }))
      );
      setCustomerOptions(
        masterData.customer_list.map((item) => ({
          value: item.customer_name,
          label: item.customer_name,
        }))
      );
      setCustomerContact(
        masterData.customer_contact_list.map((item) => ({
          value: item.customer_contact,
          label: item.customer_contact,
        }))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []); // Add isDataLoaded to dependencies

  // useEffect(() => {
  //   // Update sub-capabilities based on selected capability
  //   const selectedCapability = formik.values.capability;
  //   const selectedCapabilityObj = capabilityOptions.find(
  //     (item) => item.value === selectedCapability
  //   );
  //   const subCapabilities = selectedCapabilityObj?.sub_capabilities || [];
  //   setSubCapabilities(
  //     subCapabilities.map((subCap) => ({
  //       value: subCap.name,
  //       label: subCap.name,
  //     }))
  //   );
  // }, [formik.values.capability, capabilityOptions]);

  const handleCapabilityChange = (selectedOption) => {
    setSelectedCapability(selectedOption);
    setSelectedSubCapability(null);
  };

  const handleSubCapabilityChange = (selectedOption) => {
    setSelectedSubCapability(selectedOption);
  };

  const getSubCapabilityOptions = () => {
    if (selectedCapability) {
      const capability = capabilityOptions.find(
        (opt) => opt.value === selectedCapability.value
      );
      return capability
        ? capability.subCapabilities.map((subCap) => ({
            label: subCap,
            value: subCap,
          }))
        : [];
    }
    return [];
  };

  console.log("data", apiData);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Box
          className="main-form-wrapper"
          sx={{
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          {loading && <Loader />}
          <Box className="container" sx={{ width: 550 }}>
            <div className="row readonly-info">
              <div className="info-left">
                <div className="label">
                  Jira ID: <span>{formik.values.jira_id}</span>
                </div>
                <div className="label">
                  Expert: <span>{formik.values.expert_name}</span>
                </div>
              </div>
              <div className="refresh-btn">
                <RefreshIcon />
                <span>Reset Default</span>
              </div>
            </div>
            <div className="row">
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.customer_name && formik.errors.customer_name
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="label">Customer Name</div>
                <div className="custom-select">
                  <CustomSelect
                    options={customerOptions}
                    placeholder="Select Customer"
                    value={formik.values.customer_name}
                    onChange={(value) =>
                      formik.setFieldValue("customer_name", value)
                    }
                  />
                  {formik.touched.customer_name &&
                    formik.errors.customer_name && (
                      <div style={{ color: "red", fontSize: "14px" }}>
                        {formik.errors.customer_name}
                      </div>
                    )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.menuCard && formik.errors.menuCard
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div>
                  <div className="required label">Menu Card</div>
                </div>
                <div className="custom-select">
                  <CustomSelect
                    options={menuCardOptions}
                    placeholder="Select Menu Card"
                    value={formik.values.menuCard}
                    onChange={(value) =>
                      formik.setFieldValue("menuCard", value)
                    }
                  />
                  {formik.touched.menuCard && formik.errors.menuCard && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.menuCard}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.creator_name && formik.errors.creator_name
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="label">Customer Contact</div>
                <div className="custom-select">
                  <CustomSelect
                    options={customerContact}
                    placeholder="Select Contact"
                    value={formik.values.customer_contact}
                    onChange={(value) =>
                      formik.setFieldValue(" customer_contact", value)
                    }
                  />
                  {formik.touched.customer_contact &&
                    formik.errors.customer_contact && (
                      <div style={{ color: "red", fontSize: "14px" }}>
                        {formik.errors.customer_contact}
                      </div>
                    )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.product && formik.errors.product
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="required label">Product</div>
                <div className="custom-select">
                  <CustomSelect
                    options={productOptions}
                    placeholder="Select Product"
                    value={formik.values.product}
                    onChange={(value) => formik.setFieldValue("product", value)}
                  />
                  {formik.touched.product && formik.errors.product && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.product}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.capability && formik.errors.capability
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="required label">Capability</div>
                <div className="custom-select">
                  <CustomSelect
                    options={capabilityOptions}
                    placeholder="Select Capability"
                    value={selectedCapability}
                    onChange={handleCapabilityChange}
                  />
                  {formik.touched.capability && formik.errors.capability && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.capability}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.sub_capability && formik.errors.sub_capability
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="required label">Sub Capability</div>
                <div className="custom-select">
                  <CustomSelect
                    options={getSubCapabilityOptions()}
                    placeholder="Select Sub Capability"
                    value={selectedSubCapability}
                    onChange={handleSubCapabilityChange}
                  />
                  {formik.touched.sub_capability &&
                    formik.errors.sub_capability && (
                      <div style={{ color: "red", fontSize: "14px" }}>
                        {formik.errors.sub_capability}
                      </div>
                    )}
                </div>
              </div>
              <div
                className={`col-md-6 create-report-wrapper ${
                  formik.touched.snow_case_no && formik.errors.snow_case_no
                    ? "red-bg"
                    : "green-bg"
                }`}
              >
                <div className="required label">Snow Case ID</div>
                <div>
                  <input
                    type="text"
                    name="snow_case_no"
                    readOnly={formik.values.snow_case_no ? true : false}
                    value={formik.values.snow_case_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        formik.touched.snow_case_no &&
                        formik.errors.snow_case_no
                          ? "2px solid red"
                          : "",
                    }}
                  />
                  {formik.touched.snow_case_no &&
                    formik.errors.snow_case_no && (
                      <div style={{ color: "red", fontSize: "14px" }}>
                        {formik.errors.snow_case_no}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="create-report-wrapper green-bg">
                <div className="image-upload-text">
                  <h5>Customer Logo</h5>
                  <p>
                    Please upload a Customer logo, file format should be “JPG,
                    JPEG, PNG, and file size should be greater than 500KB
                  </p>
                </div>
                <div className="upload-image">
                  <ImageUpload imgSrc="https://1000logos.net/wp-content/uploads/2021/04/Accenture-logo.png" />
                </div>
                <span className="error-msg">
                  Please upload the customer's logo according to the guidelines
                  provided above.
                </span>
              </div>
            </div>
          </Box>
          <Box orientation="vertical" className="center-part"></Box>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            className="right-text-area"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton className="question-icon">
                <img
                  src="src/assets/Images/create-report-icon.svg"
                  alt="Create report image"
                />
              </IconButton>
              <p className="text-center">
                Please make sure you are creating the document for the correct
                Jira ID
              </p>
              <Box className="popup-action-button">
                <Button variant="outlined" onClick={onClose}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Create Report
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateReportContent;
