import * as React from 'react'
import CustomTabs from '../../components/shared/common/CustomTabs'
import { useSearchParams } from 'react-router-dom'
import AssignedIssueListing from '../../components/IssueListing/AssignedIssueListing'
import { STRING, homeTab } from '../../constants/static'
import Statistics from '../../components/statistics/Statistics'

const Home = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('active')
  return (
    <div className="container-fluid">
      <h3>Reports</h3>
      <div className="mt-5">
        <CustomTabs tabs={homeTab} defaultTab={STRING.CREATE_REPORT} tabName={STRING.ACTIVE} />
        <div style={{ marginTop: '10px' }}>
          {activeTab === STRING.CREATE_REPORT && <AssignedIssueListing />}
          {activeTab === STRING.STATISTICS && <Statistics />}
        </div>
      </div>
    </div>
  )
}

export default Home
