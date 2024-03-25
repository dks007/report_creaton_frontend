import { Box, Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomSelect from "../../shared/common/CustomSelect";
import axiosInstance from "../../../axiosInstance/axiosInstance";
import ImageUpload from "./ImageUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import Loader from "../../shared/common/Loader";
import { checkDataInList } from "../../../utils/helperFunction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageElement from "../../shared/common/ImageElement";
import ConfirmationDialog from "../../shared/common/ConfirmationDialog";

const CreateReportContent = ({ issue, onClose }) => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    customerOptions: [],
    customerContact: [],
    productOptions: [],
    menuCardOptions: [],
    capabilityOptions: [],
  });
  const [selectedValue, setSelectedValue] = useState({
    customerName: null,
    customerContact: null,
    product: null,
    menuCard: null,
    capability: null,
    subCapabilities: null,
  });
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState();
  const [snowCase, setSnowCase] = useState("");
  const [selectBoxErrors, setSelectBoxErrors] = useState({
    customerName: "",
    customerContact: "",
    product: "",
    menuCard: "",
    capability: "",
    subCapabilities: "",
    logo: "",
    snowCase: "",
    imgUrl: "",
  });
  const [logoUrl, setLogoUrl] = useState("");
  const [editLogo, setEditLogo] = useState(false);
  const [imageAvailable, setImageAvailable] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  //const jira_issue_url =  import.meta.env.VITE_JIRA_ISSUE_LINK`{issue}`
  const jiraUrl = import.meta.env.VITE_JIRA_ISSUE_LINK;
  const snowUrl = import.meta.env.VITE_SNOW_URL;
  const fetchMasterData = async () => {
    try {
      setLoading(true);
      //const response = await axiosInstance.get(`52a8ef74-e634-46b1-958a-f0d1f7339784`)
      const response = await axiosInstance.get(`/get-createreport/${issue}`);
      const masterData = response.data?.resdata;
      //console.log('masterdata', masterData)
      setApiData(masterData);
      setLogoUrl(masterData?.logo_url || "");
      setSnowCase(masterData?.snow_case_no || "");
      //options for select box
      setSelectBoxOptions((prevState) => ({
        ...prevState,
        customerOptions: masterData?.customer_list.map((item) => ({
          value: item.customer_name,
          label: item.customer_name,
          logo_url: item?.logo_url,
        })),
        customerContact: masterData?.customer_contact_list.map((item) => ({
          value: item.customer_contact,
          label: item.customer_contact,
        })),
        menuCardOptions: masterData?.menu_card_list.map((item) => ({
          value: item.menu_card,
          label: item.menu_card,
        })),
        productOptions: masterData?.product_list.map((item) => ({
          value: item.product_name,
          label: item.product_name,
        })),
        capabilityOptions: masterData?.capsubcap_list?.map((item) => ({
          value: item.name,
          label: item.name,
          subCapabilities: item.sub_capabilities.map((subCap) => subCap.name),
        })),
      }));
      setSelectedValue((prevState) => ({
        ...prevState,
        customerName: checkDataInList(
          masterData?.customer_name,
          masterData?.customer_list,
          "customer_name"
        ),
        customerContact: {
          value: masterData?.customer_contact,
          label: masterData?.customer_contact,
        },
        product: checkDataInList(
          masterData?.product,
          masterData?.product_list,
          "product_name"
        ),
        menuCard: checkDataInList(
          masterData?.menu_card,
          masterData?.menu_card_list,
          "menu_card"
        ),
        capability: {
          value: masterData?.capability,
          label: masterData?.capability,
        },
        subCapabilities: {
          value: masterData?.sub_capability,
          label: masterData?.sub_capability,
        },
      }));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  // getting sub capability option according to capability
  const getSubCapabilityOptions = () => {
    if (selectedValue.capability) {
      const capability = selectBoxOptions.capabilityOptions.find(
        (opt) => opt.value === selectedValue.capability.value
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
  // Handling reset button
  const handleRestButton = () => {
    setSnowCase(apiData?.snow_case_no);
    setSelectedValue((prevState) => ({
      ...prevState,
      customerName: checkDataInList(
        apiData?.customer_name,
        apiData?.customer_list,
        "customer_name"
      ),
      customerContact: {
        value: apiData?.customer_contact,
        label: apiData?.customer_contact,
      },
      product: checkDataInList(
        apiData?.product,
        apiData?.product_list,
        "product_name"
      ),
      menuCard: checkDataInList(
        apiData?.menu_card,
        apiData?.menu_card_list,
        "menu_card"
      ),
      capability: checkDataInList(
        apiData?.capability,
        apiData?.capsubcap_list,
        "capability"
      ),
      //capability: { value: apiData?.capability, label: apiData?.capability },
      subCapabilities: {
        value: apiData?.sub_capability,
        label: apiData?.sub_capability,
      },
    }));
    toast.success("Data reset successfully");
  };

  const handleFormSubmission = async (action) => {
    let hasErrors = false;
    const fieldsToValidate = [
      "customerName",
      "menuCard",
      "customerContact",
      "product",
      "capability",
      "subCapabilities",
    ];

    // Validate form fields
    fieldsToValidate.forEach((field) => {
      if (!selectedValue[field]?.value) {
        setSelectBoxErrors((prevState) => ({
          ...prevState,
          [field]: `Please select ${field.replace(/([A-Z])/g, " $1").trim()}.`,
        }));
        hasErrors = true;
      }
    });

    // Capability selection validation
    if (!selectedValue.capability?.value) {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        capability: "Please select a capability.",
      }));
      hasErrors = true;
    }

    // Validate snowCase
    if (snowCase === "") {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        snowCase: "Please enter snow case number.",
      }));
      hasErrors = true;
    }

    // Validate logo url
    if (!imageAvailable) {
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        imgUrl: "Logo not found. Please provide a valid logo URL.",
      }));
      hasErrors = true;
    } else {
      // Clear the error message if the logo URL is valid
      setSelectBoxErrors((prevState) => ({
        ...prevState,
        imgUrl: "",
      }));
    }

    // Exit early if there are validation errors
    if (hasErrors) return false;

    // Prepare form data
    const formData = new FormData();
    formData.append("issue_key", issue);
    formData.append("customer_name", selectedValue.customerName?.value);
    formData.append("customer_contact", selectedValue.customerContact?.value);
    formData.append("expert_name", apiData?.expert_name);
    formData.append("expert_email", apiData?.assignee_email);
    formData.append("creator_name", apiData?.creator_name);
    formData.append("menu_card", selectedValue.menuCard?.value);
    formData.append("product", selectedValue.product?.value);
    formData.append("capability", selectedValue.capability?.value);
    formData.append("sub_capability", selectedValue.subCapabilities?.value);
    formData.append("snow_case_no", snowCase);
    formData.append("logo_url", logoUrl);
    formData.append("action", action);
    //formData.append('logo', logo); // Here we append the file instead of the blob URL
    formData.append("sdm_name", apiData?.sdm_name);
    formData.append("csm_name", apiData?.csm_name);
    formData.append("sdo_name", apiData?.sdo_name);

    try {
      const response = await axiosInstance.post("/createreport/", formData);
      // Check for status code 201 for successful creation
      if (response.data.status === 201 || response.data.status === 200) {
        // If there's a message in the response body, use it; otherwise, use a default success message
        if (action == "created") {
          onClose();
        }
        const successMessage =
          response.data.msg || "Report saved successfully!";
        toast.success(successMessage);
      } else {
        // Handle other success scenarios or unexpected status codes
        //console.log('Unexpected success status code:', response);
        const message =
          response.data.msg || "Report saved, but with unexpected status code.";
        toast.warn(message);
      }
    } catch (error) {
      console.error("Failed to create report", error);

      // Attempt to extract and show a dynamic error message from the response body
      const errorMessage =
        error.response?.data?.message || "Failed to create report";
      toast.error(errorMessage);

      // Additional error handling logic can go here
    }
  };

  // Handle save button
  const handleSaveButton = async () => {
    await handleFormSubmission("saved");
  };

  // Handle create button
  const handleCreateReportButton = async () => {
    await handleFormSubmission("created");
  };

  const handleImageError = (error) => {
    // Additional error handling logic can go here
    console.log("An error occurred loading an image:", error);
    setImageAvailable(false);
  };

  return (
    <div>
      <form>
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
                  <span>Jira ID:</span>{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${jiraUrl}${issue}`}
                  >
                    {issue} <OpenInNewIcon fontSize="extra-small" />{" "}
                  </a>
                </div>
                <div className="label">
                  <span>Snow Case ID:</span>{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${snowUrl}${snowCase}`}
                  >
                    {snowCase} <OpenInNewIcon fontSize="extra-small" />{" "}
                  </a>
                </div>
                <div className="label">
                  <span>Expert:</span> <p>{apiData?.expert_name}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Customer Name</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.customerOptions}
                    placeholder="Select Customer"
                    value={selectedValue.customerName}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        customerName: selectedOption,
                      }));
                      setLogoUrl(selectedOption.logo_url);
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        customerName: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.customerName && (
                  <span className="error-msg">
                    {selectBoxErrors.customerName}
                  </span>
                )}
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
                        menuCard: selectedOption,
                      }));
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        menuCard: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.menuCard && (
                  <span className="error-msg">{selectBoxErrors.menuCard}</span>
                )}
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Customer Contact</div>
                <div className="custom-select">
                  <CustomSelect
                    options={selectBoxOptions.customerContact}
                    placeholder="Select Contact"
                    value={selectedValue.customerContact}
                    onChange={(selectedOption) => {
                      setSelectedValue((prevState) => ({
                        ...prevState,
                        customerContact: selectedOption,
                      }));
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        customerContact: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.customerContact && (
                  <span className="error-msg">
                    {selectBoxErrors.customerContact}
                  </span>
                )}
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
                        product: selectedOption,
                      }));
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        product: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.product && (
                  <span className="error-msg">{selectBoxErrors.product}</span>
                )}
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
                        subCapabilities: null,
                      }));
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        capability: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.capability && (
                  <span className="error-msg">
                    {selectBoxErrors.capability}
                  </span>
                )}
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
                        subCapabilities: selectedOption,
                      }));
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        subCapabilities: "",
                      }));
                    }}
                  />
                </div>
                {selectBoxErrors.subCapabilities && (
                  <span className="error-msg">
                    {selectBoxErrors.subCapabilities}
                  </span>
                )}
              </div>
              <div className={`col-md-6 create-report-wrapper`}>
                <div className="required label">Snow Case ID</div>
                <div>
                  <input
                    type="text"
                    className="form-cont"
                    name="snow_case_no"
                    value={snowCase}
                    maxLength={20}
                    readOnly={apiData?.snow_case_no !== ""}
                    onChange={(e) => {
                      setSnowCase(e.target.value),
                        setSelectBoxErrors((prevState) => ({
                          ...prevState,
                          snowCase: "",
                        }));
                    }}
                  />
                </div>
                {selectBoxErrors.snowCase && (
                  <span className="error-msg">{selectBoxErrors.snowCase}</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="create-report-wrapper green-bg">
                <div className="image-upload-text">
                  <h5 className="required">Customer Logo</h5>
                  {editLogo && <p>Please enter the logo image url</p>}
                </div>
                <div>
                  {/* <ImageUpload
                    imgSrc={logo}
                    onSelectImage={(file) => {
                      setLogo(file)
                      setSelectBoxErrors((prevState) => ({
                        ...prevState,
                        logo: ''
                      }))
                    }}
                  />
                  {selectBoxErrors.logo && <span className="error-msg">{selectBoxErrors.logo}</span>} */}
                  <div className="logo-image-url">
                    {editLogo && (
                      <>
                        <input
                          type="text"
                          placeholder="Enter url here..."
                          className="form-cont"
                          onChange={(e) => setLogoUrl(e.target.value)}
                          value={logoUrl}
                        />
                        <button
                          className="inline-save-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditLogo(!editLogo);
                          }}
                        >
                          <CheckIcon />
                        </button>
                      </>
                    )}

                    <div className="uploaded-img-wrapper">
                      <img
                        src={logoUrl}
                        alt="Logo not found"
                        className="uploaded-image"
                        onError={handleImageError}
                        onLoad={() => setImageAvailable(true)}
                      />
                    </div>
                    {!editLogo && (
                      <button
                        className="inline-save-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditLogo(!editLogo);
                        }}
                      >
                        <EditIcon />
                      </button>
                    )}
                  </div>

                  {selectBoxErrors.imgUrl && (
                    <span className="error-msg">{selectBoxErrors.imgUrl}</span>
                  )}
                </div>
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
                <div className="button-row-one">
                  <Button variant="outlined" onClick={handleSaveButton}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    className="refresh-btn"
                    onClick={handleRestButton}
                  >
                    <RefreshIcon /> <span>Reset</span>
                  </Button>
                </div>
                <Button
                  variant="contained"
                  onClick={() => setOpenConfirmDialog(true)}
                >
                  Create Report
                </Button>
                <ConfirmationDialog
                  open={openConfirmDialog}
                  onClose={() => setOpenConfirmDialog(false)}
                  onConfirm={() => {
                    handleCreateReportButton("created");
                    setOpenConfirmDialog(false);
                  }}
                  title="Confirm Report Creation"
                  message="Are you sure you want to create this report?"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateReportContent;
