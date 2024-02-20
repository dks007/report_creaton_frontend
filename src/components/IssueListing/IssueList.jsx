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
        console.log('API Response:', response.data);
        setIssueData(prevIssueData => [...prevIssueData, ...response.data.resdata]);
        setTotalRecords(response.data.total_record);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      }
    };

    console.log('Current Page:', currentPage);
    fetchData();
  }, [currentPage, itemsPerPage]);

  // Calculate indices for slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Extract currentItems using array slicing
  const currentItems = issueData.slice(indexOfFirstItem, Math.min(indexOfLastItem, issueData.length));
  console.log('Current Items:', currentItems);

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
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleBack}>
                  <KeyboardArrowLeftIcon />
                </button>
              </li>
              <li className={`page-item ${currentPage === totalRecords ? 'disabled' : ''}`}>
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
