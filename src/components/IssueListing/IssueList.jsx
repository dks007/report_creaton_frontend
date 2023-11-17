import React from 'react'
import TableHead from '../shared/common/TableHead'
import { issueListTableHeaders } from '../../constants/static'
import IssueBody from './IssueBody'

const IssueList = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover  table-borderless">
        <TableHead headers={issueListTableHeaders} />
        <tbody>
          <IssueBody />
        </tbody>
      </table>
    </div>
  )
}

export default IssueList
