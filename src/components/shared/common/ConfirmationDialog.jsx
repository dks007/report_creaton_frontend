import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  styled,
} from "@mui/material";

// Custom styled components
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: "white", // Customizing title color
  backgroundColor: "#503998", // Background color for the title bar
  padding: theme.spacing(1), // Reduce padding to decrease height, adjust as needed
  "& .MuiTypography-root": {
    // Assuming you are using MUI v5 or above
    fontSize: "1rem", // Reduce the font size if necessary
  },
}));

const CustomDialogContent = styled(DialogContent)({
  backgroundColor: "#f0f8ff", // A light color for the dialog body
});

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <CustomDialogTitle id="confirmation-dialog-title">
        {title}
      </CustomDialogTitle>
      <CustomDialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {message}
        </DialogContentText>
      </CustomDialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
