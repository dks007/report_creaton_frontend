import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CreateReportContent from "./createReport/CreateReportContent";
import CustomModal from "../shared/common/CustomModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CreateReportModal = ({ showModal, handleHideModal, issue }) => {
  return (
    <CustomModal open={showModal}>
      <Box
        sx={{
          display: "flex",
          padding: 0.5,
          paddingLeft: 2,
          justifyContent: "space-between",
          alignItems: "center",
          background: "#503998",
        }}
      >
        <Typography variant="h6">Creating document for</Typography>
        <IconButton onClick={handleHideModal} className="close-btn">
          <HighlightOffIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: 2 }}>
        <CreateReportContent issue={issue} onClose={handleHideModal} />
      </Box>
    </CustomModal>
  );
};

export default CreateReportModal;
