import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routePath } from "../../constants/routes";
import { Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CreateReportModal from "./CreateReportModal";
import SyncTwoToneIcon from "@mui/icons-material/SyncTwoTone";
import SaveIcon from "@mui/icons-material/Save";
import axiosInstance from "../../axiosInstance/axiosInstance";

const IssueBody = ({ issue, index, onRefresh }) => {
  console.log("testing");
  const [showModal, setShowModal] = useState(false);

  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subtasks, setSubtasks] = useState([]); // To store fetched subtasks
  const [loadingSubtasks, setLoadingSubtasks] = useState(false); // To indicate loading state
  const [subtaskVisible, setSubtaskVisible] = useState(false); // To manage visibility of subtasks

  const fetchSubtasks = async (issueKey) => {
    //if (subtasks) return; // Consider refining this logic if you need to fetch different subtasks based on the issueKey
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/subtask-listing/${issueKey}`);
      setSubtasks(response.data.resdata); // Assuming 'resdata' is the correct field containing your data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Simplify the ToggleClass function
  const ToggleClass = (issueKey) => {
    const shouldFetch = !subtaskVisible && subtasks.length === 0;
    setSubtaskVisible(!subtaskVisible);
    if (shouldFetch) {
      fetchSubtasks(issueKey);
    }
  };

  /* const ToggleClass = () => {
    setActive(!isActive);
  }; */

  const handleShowModal = () => {
    setShowModal(true);
    handleClose();
  };
  const handleHideModal = () => {
    setShowModal(false);
    onRefresh(issue.issue_key);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ** Start: Action button/column */
  const handleDownload = () => {
    if (issue.download_link) {
      const encodedUrl = encodeURI(issue.download_link); // Ensure the URL is correctly encoded
      const anchor = document.createElement("a");
      anchor.href = encodedUrl;
      anchor.setAttribute("download", true);
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        // Add a slight delay before removing the anchor
        document.body.removeChild(anchor);
      }, 100); // Delay in milliseconds
    } else {
      console.error("No download URL provided.");
    }
  };

  const handleRefresh = () => {
    // Handle refresh action
  };
  // ** End: Action button/column */
  const renderActionButton = () => {
    switch (issue.report_status) {
      case "1": // Not Created
        return (
          <MenuItem onClick={handleShowModal}>
            <AddIcon /> Create Report
          </MenuItem>
        );

      case "2": // Initiated
        return null;

      case "3": // In Progress
        return null;

      case "4": // Created
        const prefixToRemove =
          "https://successpilot.corpnet.ifsworld.com/report_";
        // Extract the filename from the download link and remove the prefix
        const filename = issue.download_link.replace(prefixToRemove, "");
        return (
          //<MenuItem onClick={handleDownload}>
          <MenuItem>
            <a href={encodeURI(issue.download_link)} download={filename}>
              <DownloadIcon /> Download
            </a>
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
  // Function to get the report status text based on report_status value
  const getReportStatusText = () => {
    switch (issue.report_status) {
      case "1":
        return "Not Created";
      case "2":
        return "Initiated";
      case "3":
        return "In Progress ";
      case "4":
        return "Created";
      case "5":
        return "Saved";
      case "6":
        return "Error";
      default:
        return "Unknown Status";
    }
  };
  const getRowColor = () => {
    switch (issue.report_status) {
      case "1":
        return "";
      case "2":
        return "orange-row";
      case "3":
        return "orange-row";
      case "4":
        return "green-row";
      case "5":
        return "saved-with-data";
      case "6":
        return "red-row";
      default:
        return "";
    }
  };
  const dynamicClass = getRowColor();

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#3D1B63",
      color: "#fff",
      maxWidth: 270,
      minWidth: 270,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
  }));

  return (
    <>
      <tr className={`table ${dynamicClass}`}>
        <th scope="row">
          <div className="item-number-action">
            <span>{index + 1}</span>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {issue.subtask === false && <MoreVertIcon />}
            </Button>
            <CreateReportModal
              showModal={showModal}
              handleHideModal={handleHideModal}
              issue={issue.issue_key}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              className="list-item-action"
            >
              {renderActionButton()}
            </Menu>
          </div>
        </th>
        <td className="jira-col">
          <Link to={`${routePath.ISSUEBYID}${issue.issue_key}`}>
            {issue.issue_key}
          </Link>
          {/* tooltip for showing sub task */}
          {issue.subtasks_list && issue.subtasks_list.length > 0 && (
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="tooltip-content-wrapper">
                    {issue.subtasks_list.map((subtask) => (
                      <div
                        key={subtask.key}
                        className="custom-tooltip-html contentonly"
                      >
                        <Typography component="div" color="inherit">
                          Task ID: <span>{subtask.key}</span>
                        </Typography>
                        <Typography component="div" color="inherit">
                          Title: <span>{subtask.summary}</span>
                        </Typography>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              }
            >
              <img
                src="../src/assets/Images/sub-task.png"
                className="subtask-icon"
                alt="subtask"
                onClick={() => ToggleClass(issue.issue_key)}
              />
            </HtmlTooltip>
          )}
        </td>
        <td className="customer-col fw-medium">
          <div className="customer-information">
            <span>{issue.project_name}</span>
            <HtmlTooltip
              placement="right-start"
              arrow
              title={
                <React.Fragment>
                  <div className="custom-tooltip-html">
                    <p>Customer Name</p>
                    <p className="value">{issue.project_name}</p>
                  </div>
                  <div className="custom-tooltip-html">
                    <p>Customer ID</p>
                    <p className="value">{issue.customer_id}</p>
                  </div>
                  <div className="custom-tooltip-html">
                    <p>Project ID</p>
                    <p className="value">{issue.project_id}</p>
                  </div>
                </React.Fragment>
              }
            >
              <InfoIcon
                fontSize="extra-small"
                className="ml-10 main-color-fill"
              />
            </HtmlTooltip>
            {/* tooltip for showing partner */}
            {issue.partner === true && (
              <HtmlTooltip
                placement="right-start"
                arrow
                title={
                  <React.Fragment>
                    <div className="custom-tooltip-html">
                      <p>Partners</p>
                      <p className="value">
                        This icon indicates that this report is created for a
                        partner.
                      </p>
                    </div>
                  </React.Fragment>
                }
              >
                <img
                  src="../src/assets/Images/patner-icon.png"
                  className="subtask-icon ml-10"
                  alt="partner"
                />
              </HtmlTooltip>
            )}
            {/* tooltip for showing partner end*/}
          </div>
        </td>
        <td className="menu-id-col">
          <div>
            <span>{issue.menu_card}</span>
            {issue.menu_card && ( // Only render the tooltip if menu card exists
              <HtmlTooltip
                placement="right-start"
                arrow
                title={
                  <React.Fragment>
                    <div className="custom-tooltip-html">
                      <p className="reguler-text font-14">
                        {issue.menu_description}
                      </p>
                    </div>
                  </React.Fragment>
                }
              >
                <InfoIcon
                  fontSize="extra-small"
                  className="ml-10 main-color-fill"
                />
              </HtmlTooltip>
            )}
          </div>
        </td>
        {/* <td className="menu-des-col"><Tooltip title="{issue.menu_desc}" placement="bottom"><div>{issue.menu_desc}</div></Tooltip></td> */}
        <td className="ticket-des-col" width="250">
          <div>{issue.issue_summary}</div>
        </td>
        <td className="csm-col">
          <div>{issue.csm_name}</div>
        </td>
        <td className="sdm-col">
          <div>{issue.sdm_name}</div>
        </td>
        <td className="sdo-col">
          <div>{issue.sdo_name}</div>
        </td>
        <td className="created-col">
          <div>{issue.created_date}</div>
        </td>
        <td className="assigned-col">
          <div>{issue.assign_date}</div>
        </td>
        <td className="report-col">
          <div>
            <span className={`report-status status-${issue.report_status}`}>
              {issue.report_status === "6" && (
                <HtmlTooltip
                  placement="right-start"
                  arrow
                  title={
                    <React.Fragment>
                      <div className="custom-tooltip-html">
                        <p className="reguler-text font-14">
                          {issue.report_error}
                        </p>
                      </div>
                    </React.Fragment>
                  }
                  className="error-tooltip"
                >
                  <InfoIcon
                    fontSize="extra-small"
                    className="ml-10 main-color-fill"
                  />
                </HtmlTooltip>
              )}
              {/* save status condition */}
              {issue.report_status === "5" && (
                <HtmlTooltip
                  placement="right-start"
                  arrow
                  title={
                    <React.Fragment>
                      <div className="custom-tooltip-html">
                        <p className="bold-text font-14">
                          The report creation process has commenced but remains
                          ongoing.
                          {/* {issue.report_error} */}
                        </p>
                        <p className="reguler-text font-14">
                          Some information has been gathered and saved.
                        </p>
                      </div>
                    </React.Fragment>
                  }
                  className="saved-tooltip"
                >
                  <SaveIcon className="save-icon" />
                </HtmlTooltip>
              )}
              {getReportStatusText()}
            </span>
          </div>
        </td>
      </tr>
      {subtaskVisible && subtasks.length > 0 && (
        <tr id="sub-table-master" className={isActive ? "inactive" : "active"}>
          <td colSpan={11}>
            <table aria-colspan={11}>
              <thead>
                <tr>
                  <th width="85">#</th>
                  <th>Jira ID</th>
                  <th>Description</th>
                  <th>Assignee</th>
                  <th>Created</th>
                  <th>Assign Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subtasks.map((subtask, index) => (
                  <tr key={`${issue.issue_key}-${subtask.key}`}>
                    <td className="sub-item-number">
                      <span>{index + 1}</span>
                    </td>
                    <td className="issue-id-col">{subtask.issue_key}</td>
                    <td className="issue-des-col">{subtask.issue_summary}</td>
                    {/* Assuming the API returns these fields, or adjust as necessary */}
                    <td className="assign-by-col">{subtask.assignee_name}</td>
                    <td className="assign-to-col">{subtask.created_date}</td>
                    <td className="created-on-col">{subtask.assign_date}</td>
                    <td className="status-col">
                      <span className={`status-${subtask.status}`}>
                        {subtask.jira_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default IssueBody;
