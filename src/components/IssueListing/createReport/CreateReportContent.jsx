import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "../../shared/common/Dropdown";
import { useFormik } from "formik";
import { craeteReportSchema } from "../../../constants/validationSchema";

const CreateReportContent = ({ issue }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formInputs, setFormInputs] = useState({
    jira_id: "",
    menuId: "",
    customer_name: "",
    expert_name: "",
    creator: "",
    capability: "",
    sub_capability: "",
  });

  //const [ProductselectedValue, ProductsetSelectedValue] = useState("Select Product");
  const ProducthandleSelect = (value) => {
    // ProductsetSelectedValue(value);
    // Do something with the selected value, e.g., pass it to other components or update state.
  };
  // const Productoptions = ['Finance', 'Expert', 'Marketing']
  const pVlaue = [
    { value: "finance", label: "Finance" },
    { value: "expert", label: "Expert" },
    { value: "marketing", label: "Marketing" },
  ];

  /**
   * The function `handleFileUpload` takes an event object as input, retrieves the uploaded file from
   * the event, and sets the selected image to the URL of the uploaded file.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  /**
   * The function handleRemoveImage sets the selected image to null.
   */

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (event) => {
    console.log("aaaaa", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      customer_name: "",
      lastName: "",
      email: "",
    },
    validationSchema: craeteReportSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      <Box sx={{ width: 600 }}>
        <div className="row">
          <div className="col-md-6">Jira ID</div>
          <div className="col-md-6">
            <input
              type="text"
              name="jira_id"
              defaultValue={issue?.jira_id}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p className="required">Menu Card</p>
            <p>Couldn't Identify Menu Card ID</p>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="menu_id"
              defaultValue={issue.menu_id}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Box className="row mt-3">
          <div className="col-md-6">Customer Name</div>
          <div className="col-md-6">
            <input
              type="text"
              name="customer_name"
              value={formik.values.customer_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.customer_name && formik.errors.customer_name ? (
              <div style={{ color: "red" }}>{formik.errors.customer_name}</div>
            ) : null}
          </div>
        </Box>
        <div className="row mt-3">
          <div className="col-md-6">Expert</div>
          <div className="col-md-6">
            <input
              type="text"
              name="expert_name"
              defaultValue="SAT PAL"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">Creator</div>
          <div className="col-md-6">
            <input
              type="text"
              name="creator"
              defaultValue="Kendrion Gmbh"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">Product</div>
          <div className="col-md-6">
            <Dropdown options={pVlaue} onSelect={(e) => console.log(e)} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">Capability</div>
          <div className="col-md-6">
            <input
              type="text"
              name="capability"
              defaultValue="Purchasing"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">Sub Capability</div>
          <div className="col-md-6">
            <input
              type="text"
              name="sub_capability"
              defaultValue="Purchase Order"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">Customer Logo</div>
          <div className="col-md-6">
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                border: "1px dashed gray",
                width: "200px",
                maxheight: "200px",
                overflow: "hidden",
              }}
            >
              {selectedImage && (
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <CloseIcon sx={{ color: "#503998" }} />
                </IconButton>
              )}
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                    id="fileInput"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileInput">
                    <IconButton
                      component="span"
                      sx={{ margin: 2, marginLeft: 8, background: "#503998" }}
                    >
                      <FileUploadRoundedIcon sx={{ color: "white" }} />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>
          </div>
        </div>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ padding: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "center", marginRight: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
          }}
        >
          <IconButton>
            <HelpOutlineIcon sx={{ color: "#503998" }} fontSize="large" />
          </IconButton>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Please make sure you are creating the document for correct Jira ID
          </Typography>
          <Box sx={{ marginTop: 4, gap: 2, display: "flex" }}>
            <Button variant="outlined">Not Sure</Button>
            <Button variant="contained" sx={{}}>
              I am sure
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateReportContent;
