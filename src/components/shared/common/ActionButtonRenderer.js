// ActionButtonRenderer.js

import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

export const renderActionButton = (issue, handleShowModal, handleDownload, handleRefresh) => {
  switch (issue.report_status) {
    case '1': // Not Created
      return (
        <MenuItem onClick={handleShowModal}>
          <AddIcon /> Create Report
        </MenuItem>
      );

    case '2': // Initiated
      return (
        <MenuItem onClick={handleRefresh}>
          <DownloadIcon /> Initiatedn
        </MenuItem>
      );

    case '3': // In Progress
      return (
        <MenuItem onClick={handleRefresh}>
          <DownloadIcon /> In Progress
        </MenuItem>
      );

    case '4': // Created
      return (
        <MenuItem onClick={handleDownload}>
          <DownloadIcon /> Created
        </MenuItem>
      );

    case '5': // Saved
      return (
        <MenuItem onClick={handleShowModal}>
          <AddIcon /> Saved
        </MenuItem>
      );

    case '6': // Unknown
      return (
        <MenuItem onClick={handleShowModal}>
          <AddIcon />
          Error
        </MenuItem>
      );

    default:
      return null;
  }
};
