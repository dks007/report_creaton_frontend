import React from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'

const IssueBody = () => {
  return (
    <tr className="table">
      <th scope="row">1</th>
      <td className='jira-col'>
        <Link to={routePath.ISSUEBYID}>JI215542</Link>
      </td>
      <td className='customer-col'>Mark</td>
      <td className='menu-id-col'>@mdo</td>
      <td className='menu-des-col'>Mark</td>
      <td className='ticket-des-col'>Otto</td>
      <td className='sdo-col'>@mdo</td>
      <td className='sdm-col'>Mark</td>
      <td className='csm-col'>Otto</td>
      <td className='assigned-col'>@mdo</td>
      <td className='created-col'>Mark</td>
      <td className='report-col'>
        <span className="report-status not-created">Not Created</span>
      </td>
      <td className='action-col'>
        <button className="btn">
          <i class="fa-solid fa-plus"></i>
          Create
        </button>
      </td>
    </tr>
  )
}

export default IssueBody
