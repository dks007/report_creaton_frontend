import * as React from 'react'
import CustomTabs from '../../components/shared/common/CustomTabs'
import { useSearchParams } from 'react-router-dom'
import AssignedIssueListing from '../../components/IssueListing/AssignedIssueListing'
import { STRING, homeTab } from '../../constants/static'
import Statistics from '../../components/statistics/Statistics'
import HomeIcon from '@mui/icons-material/Home';


const Home = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('active')
  return (
    <div className="container-fluid">
      <h3>Assigned Jira Issues</h3>
      <div className='bredcrumbs'>
        <ul>
          <li className='first-child'><a href='#'><HomeIcon fontSize='small'/> </a></li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
              <path d="M-5.13609e-08 8.89141L3.81667 5.06641L-3.85753e-07 1.24141L1.175 0.0664062L6.175 5.06641L1.175 10.0664L-5.13609e-08 8.89141Z" fill="#555555"/>
            </svg>
          </li>
          <li>Assigned Jira Issues</li>
        </ul>
      </div>
      <div className="mt-4">
        <CustomTabs tabs={homeTab} defaultTab={STRING.CREATE_REPORT} tabName={STRING.ACTIVE} />
        <div className='table-wrapper'>
          {activeTab === STRING.CREATE_REPORT && <AssignedIssueListing />}
          {activeTab === STRING.STATISTICS && <Statistics />}
        </div>
      </div>
    </div>
  )
}

export default Home
