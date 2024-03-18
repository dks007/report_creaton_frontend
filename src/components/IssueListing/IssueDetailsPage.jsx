import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomTabs from "../shared/common/CustomTabs";
import {
  STRING,
  assignedJiraIssuesDetails,
  detailsPageTab,
} from "../../constants/static";
import OngoingReport from "./OngoingReport";
import HistoricReport from "./HistoricReport";
import { Box, Typography } from "@mui/material";
import ImageElement from "../shared/common/ImageElement";
import { profile } from "../../assets/Images/images";
import IconBreadcrumbs from "../shared/common/IconBreadcrumbs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import SyncTwoToneIcon from "@mui/icons-material/SyncTwoTone";
import CreateReportModal from "./CreateReportModal";
import Loader from "../shared/common/Loader";
import axiosInstance from "../../axiosInstance/axiosInstance";

const IssueDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const tab = searchParams.get("active");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [error, setError] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleHideModal = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/issue-details/${id}`); // Fetch data from the correct endpoint
        setIssueData(response.data.resdata[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Make sure to include id in the dependency array

  // ** End: Action button/column */
  const renderActionButton = (issue) => {
    switch (issue.report_status) {
      case "1": // Not Created
        return (
          <MenuItem onClick={handleShowModal}>
            <AddIcon /> Create Report
          </MenuItem>
        );

      case "2": // Initiated
        return <MenuItem>Initiatedn</MenuItem>;

      case "3": // In Progress
        return <MenuItem>In Progress</MenuItem>;

      case "4": // Created
        return (
          <MenuItem onClick={handleDownload}>
            <DownloadIcon /> Created
          </MenuItem>
        );
      case "5": //  Saved
        return (
          <MenuItem onClick={handleShowModal}>
            <AddIcon /> Saved
          </MenuItem>
        );
      case "6": // Unknown
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

  return (
    <div className="details-page">
      {loading && <Loader />}
      <Box className="row">
        <Box className="col-md-8">
          <h3>Issues Details Page</h3>
          <IconBreadcrumbs breadcrumbs={assignedJiraIssuesDetails} />
        </Box>
        <Box className="col-md-4 action-items">
          {renderActionButton({ issueData })}
        </Box>
        <CreateReportModal
          showModal={showModal}
          handleHideModal={handleHideModal}
        />
      </Box>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-3 customer-info">
          <div className="custom-box">
            <Box className="customer-details">
              <Box className="customer-logo">
                <ImageElement
                  src={issueData.logo_url}
                  placeholderSrc={profile}
                  width={140}
                  height={140}
                />
                {/* <ImageElement src={profile} placeholderSrc={profile} width={140} height={140} /> */}
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: 20, marginTop: 1 }}
              >
                {issueData.project_name}
              </Typography>
            </Box>
            <div className="detail-list">
              <h6>Customer ID</h6>
              <p>
                <span>{issueData.customer_id}</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Project ID</h6>
              <p>
                <span>{issueData.project_id}</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Contact Email</h6>
              <p>
                <span>{issueData.customer_email}</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Contact number</h6>
              <p>
                <span>{issueData.customer_contact_no}</span>
                <ContentCopyIcon />
              </p>
            </div>
            <div className="detail-list">
              <h6>Location</h6>
              <p>
                <span>{issueData.customer_location}</span>
                <ContentCopyIcon />
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="custom-box">
            <CustomTabs
              tabs={detailsPageTab}
              defaultTab={STRING.ONGOING_REPORT}
              tabName={STRING.ACTIVE}
            />

            {tab === "ongoing-report" && (
              <OngoingReport issueData={issueData} />
            )}
            {tab === "historical-report" && <HistoricReport />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
