import * as React from 'react'
import CustomTabs from '../../components/shared/common/CustomTabs'
import { useSearchParams } from 'react-router-dom'
import AssignedIssueListing from '../../components/IssueListing/AssignedIssueListing'
import { STRING, assignedJiraIssues, homeTab } from '../../constants/static'
import Statistics from '../../components/statistics/Statistics'
import IconBreadcrumbs from '../../components/shared/common/IconBreadcrumbs'
import { Button } from '@mui/material'

const Home = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('active')

  return (
    <div className="container-fluid">
      <h3>Assigned Jira Issues</h3>

      <IconBreadcrumbs breadcrumbs={assignedJiraIssues} />
      <div className="mt-4">
        <CustomTabs tabs={homeTab} defaultTab={STRING.CREATE_REPORT} tabName={STRING.ACTIVE} />
        <div className="table-wrapper">
          {activeTab === STRING.CREATE_REPORT && <AssignedIssueListing />}
          {activeTab === STRING.STATISTICS && <Statistics />}
        </div>
      </div>
    </div>
  )
}

export default Home
