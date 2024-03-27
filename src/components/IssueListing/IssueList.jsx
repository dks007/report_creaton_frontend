import React, { useState, useEffect, useRef, useCallback } from "react";
import TableHead from "../shared/common/TableHead";
import { issueListTableHeaders } from "../../constants/static";
import IssueBody from "./IssueBody";
import axiosInstance from "../../axiosInstance/axiosInstance";
import Loader from "../shared/common/Loader";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { toast } from "react-toastify";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FilterComp from "../shared/common/Filters";
import { useNavigate } from "react-router-dom";

const IssueList = () => {
  const navigate = useNavigate();
  const itemPerPage = import.meta.env.VITE_ISSUE_LIST_PERPAGE;
  const [loading, setLoading] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(null);
  const [refreshedIssueKey, setRefreshedIssueKey] = useState(null);

  const [filters, setFilters] = useState({}); // Add this line

  const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value !== null && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        `API Request - Start: ${
          (currentPage - 1) * itemsPerPage
        }, Max Result: ${itemsPerPage}`
      );
      try {
        setLoading(true);
        const response = await axiosInstance.get("issue-listing/", {
          params: {
            start: (currentPage - 1) * itemsPerPage,
            max_result: itemsPerPage,
            ...activeFilters, // Spread the filters into params
          },
        });
        //const response = await axiosInstance.get('ef96ecfb-11bc-4d83-8509-c4de1f5d1192')
        // Update issueData state properly based on currentPage
        setIssueData((prevData) => {
          // If currentPage is 1, replace existing data
          if (currentPage === 1) {
            return response.data.resdata;
          } else {
            // If currentPage > 1, append new data to existing data
            return [...prevData, ...response.data.resdata];
          }
        });
        setTotalRecords(response.data.total_record);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
        setLoading(false);
      }
    };

    console.log(
      `Fetching data for page: ${currentPage}, items per page: ${itemsPerPage}`
    );
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  // Function to update filters from FilterComp
  const updateFilters = useCallback((newFilters) => {
    const { jiraId, expertEmail } = newFilters;
    console.log("newFilters", newFilters);
    let queryParams = "?active=create-report";
    if (jiraId) {
      queryParams += `&jiraId=${jiraId}`;
    }
    if (expertEmail) {
      queryParams += `&expertEmail
      =${expertEmail}`;
    }
    navigate(queryParams);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page to apply filters from the beginning
  }, []);

  const handleFilterReset = useCallback(() => {
    navigate("?active=create-report");
    setFilters({}); // Reset filters
    setCurrentPage(1);
  }, []);

  // Satrt : Fetch and update particular issue when creating report
  const fetchSingleIssueData = async (issueId) => {
    try {
      const response = await axiosInstance.get(`issue-details/${issueId}`);
      return response.data.resdata[0];
    } catch (error) {
      console.error(`Error fetching issue data for issue ${issueId}:`, error);
      toast.error(`Failed to refresh issue data for issue ${issueId}`);
      return null;
    }
  };

  const handleRefresh = useCallback(async (issueKey) => {
    const updatedIssue = await fetchSingleIssueData(issueKey);
    if (updatedIssue) {
      setIssueData((prevData) =>
        prevData.map((issue) =>
          issue.issue_key === issueKey ? { ...issue, ...updatedIssue } : issue
        )
      );
      setRefreshedIssueKey(issueKey);
    }
  }, []);

  // Trigger the second call after 30 seconds for the refreshed issue
  useEffect(() => {
    if (refreshedIssueKey) {
      const timer = setTimeout(() => {
        handleRefresh(refreshedIssueKey);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [refreshedIssueKey, handleRefresh]);

  // End : fetch and update issue after given time

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = issueData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBack = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
  };

  const handleForward = () => {
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    setCurrentPage((prevCurrentPage) =>
      Math.min(prevCurrentPage + 1, totalPages)
    );
  };

  const [isActive, setActive] = useState("false");

  const ToggleClass = (event) => {
    event.stopPropagation(); // Add this to prevent unwanted event bubbling
    setActive(!isActive);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* filter section Start */}
          <div className="filter-wrapper">
            <div className="filter-btn" onClick={ToggleClass}>
              <span>
                <FilterAltOutlinedIcon fontSize="small" /> Filter
              </span>
            </div>
            <div id="filter-content-sec" className={isActive ? "hide" : "show"}>
              <div className="filter-control">
                <FilterComp
                  onFilterApply={updateFilters}
                  onFilterReset={handleFilterReset}
                />
              </div>
              <span className="cancel-filter" onClick={ToggleClass}>
                <HighlightOffOutlinedIcon />
              </span>
            </div>
          </div>
          {/* filter section End */}
          <div className="table-responsive">
            <table className="table table-hover table-borderless">
              <TableHead headers={issueListTableHeaders} />
              <tbody>
                {currentItems.map((issue, index) => (
                  <IssueBody
                    key={issue.issue_key}
                    issue={issue}
                    index={(currentPage - 1) * itemsPerPage + index}
                    onRefresh={() => handleRefresh(issue.issue_key)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 d-flex justify-content-start pagination-wrapper">
            <ul className="pagination">
              <li className="pagination-text">
                Showing Page {currentPage} of{" "}
                {Math.ceil(totalRecords / itemsPerPage)}
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={handleBack}>
                  <KeyboardArrowLeftIcon />
                </button>
              </li>
              <div className="current-page">{currentPage}</div>
              <li
                className={`page-item ${
                  currentPage === Math.ceil(totalRecords / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button className="page-link" onClick={handleForward}>
                  <KeyboardArrowRightIcon />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default IssueList;
