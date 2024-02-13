import React, { useState, useEffect } from 'react';
import TableHead from '../shared/common/TableHead';
import { issueListTableHeaders } from '../../constants/static';
import IssueBody from './IssueBody';
import axiosInstance from '../../axiosInstance/axiosInstance ';
import Loader from '../shared/common/Loader';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const IssueList = () => {
  const itemPerPage = import.meta.env.VITE_ISSUE_LIST_PERPAGE;
  const [loading, setLoading] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemPerPage);
  const [totalRecords, setTotalRecords] = useState(0); // Added totalRecords state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('issue-listing/', {
          params: {
            start: (currentPage - 1) * itemsPerPage, // Calculate start index
            max_result: itemsPerPage // Set max_result to fetch
          }
        });
        setIssueData(response.data.resdata);
        setTotalRecords(response.data.total_record); // Set total records
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Trigger fetchData on currentPage change

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleForward = () => {
    const totalPages = Math.ceil(totalRecords / itemsPerPage); // Calculate total pages
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="table-responsive">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <table className="table table-hover table-borderless">
            <TableHead headers={issueListTableHeaders} />
            <tbody>
              {issueData.map((issue, index) => (
                <IssueBody key={index.toString()} issue={issue} />
              ))}
            </tbody>
          </table>
          <nav className="mt-3 d-flex justify-content-start">
            <ul className="pagination">
              <li className="pagination-text">
                Showing Page {currentPage} of {Math.ceil(totalRecords / itemsPerPage)}
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleBack}>
                  <KeyboardArrowLeftIcon />
                </button>
              </li>
              <div className="current-page">{currentPage}</div>
              <li className={`page-item ${currentPage === Math.ceil(totalRecords / itemsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleForward}>
                  <KeyboardArrowRightIcon />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default IssueList;
