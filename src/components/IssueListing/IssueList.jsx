import React, { useState, useEffect } from 'react';
import TableHead from '../shared/common/TableHead';
import { issueListTableHeaders } from '../../constants/static';
import IssueBody from './IssueBody';
import axiosInstance from '../../axiosInstance/axiosInstance';
import Loader from '../shared/common/Loader';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const IssueList = () => {
  const itemPerPage = import.meta.env.VITE_ISSUE_LIST_PERPAGE;
  const [loading, setLoading] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('issue-listing/', {
          params: {
            start: (currentPage - 1) * itemsPerPage,
            max_result: itemsPerPage
          }
        });
        console.log('API Response:', response.data); // Debug
        setIssueData(prevData => [...prevData, ...response.data.resdata]);
        setTotalRecords(response.data.total_record);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // Include itemsPerPage as dependency

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = issueData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleForward = () => {
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    const pageNumbers = [];

    // Display first three pages
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      pageNumbers.push(i);
    }

    // Display last three pages
    if (totalPages > 3) {
      pageNumbers.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return (
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleBack}>
            <KeyboardArrowLeftIcon />
          </button>
        </li>

        {pageNumbers.map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === "..." ? (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            ) : (
              <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            )}
          </React.Fragment>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleForward}>
            <KeyboardArrowRightIcon />
          </button>
        </li>
      </ul>
    );
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
              {currentItems.map((issue, index) => (
                <IssueBody key={index.toString()} issue={issue} index={index + indexOfFirstItem} />
              ))}
            </tbody>
          </table>
          <nav className="mt-3 d-flex justify-content-start">
            {renderPaginationControls()}
          </nav>
        </div>
      )}
    </div>
  );
};

export default IssueList;
