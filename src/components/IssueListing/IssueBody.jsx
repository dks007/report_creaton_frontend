import React from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '../../constants/routes'
import './issue.css'
import { FaPlus } from 'react-icons/fa6'

const IssueBody = () => {
  return (
    <tr className="table">
      <th scope="row">1</th>
      <td>
        <Link to={routePath.ISSUEBYID}>JI215542</Link>
      </td>
      <td>Mark</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>
        <span className="report-status">Hello</span>
      </td>
      <td>
        <button className="btn">
          <i class="fa-solid fa-plus"></i>
          Create
        </button>
      </td>
    </tr>
  )
}

export default IssueBody
