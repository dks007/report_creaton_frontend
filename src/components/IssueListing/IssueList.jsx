import React, { useState, useEffect } from 'react'
import TableHead from '../shared/common/TableHead'
import { issueListTableHeaders } from '../../constants/static'
import IssueBody from './IssueBody'
import axiosInstance from '../../axiosInstance/axiosInstance '
import Loader from '../shared/common/Loader'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const IssueList = () => {
  const itemPerPage = import.meta.env.VITE_ISSUE_LIST_PERPAGE
  const [loading, setLoading] = useState(false)
  const [issueData, setIssueData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemPerPage)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/issuelisting/issue_list')
        setIssueData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('An error occurred while fetching data. Please try again later.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = issueData.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
              <li className="pagination-text">
                Showing Page {currentPage} of {Math.ceil(issueData.length / itemsPerPage)}
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  <KeyboardArrowLeftIcon />
                </button>
              </li>
              <div className="current-page">{currentPage}</div>
              <li className={`page-item ${currentPage === Math.ceil(issueData.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  <KeyboardArrowRightIcon />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default IssueList
