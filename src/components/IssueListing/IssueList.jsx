import React, { useState, useEffect } from 'react'
import TableHead from '../shared/common/TableHead'
import { issueListTableHeaders } from '../../constants/static'
import IssueBody from './IssueBody'
import axios from 'axios'

const IssueList = () => {
  const [issueData, setIssueData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://655b84d1ab37729791a93eef.mockapi.io/api/v1/issuelisting/jira_id')
        setIssueData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
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
      <table className="table table-hover table-borderless">
        <TableHead headers={issueListTableHeaders} />
        <tbody>
          {currentItems.map((issue, index) => (
            <IssueBody key={issue.id} issue={issue} index={index + indexOfFirstItem} />
          ))}
        </tbody>
      </table>
      <nav className="mt-3 d-flex justify-content-end">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              {'<'}
            </button>
          </li>
          <div className="ml-2 mt-1">
            Page {currentPage} of {Math.ceil(issueData.length / itemsPerPage)}
          </div>
          <li className={`page-item ${currentPage === Math.ceil(issueData.length / itemsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              {'>'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default IssueList
