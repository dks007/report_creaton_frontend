export const STRING = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CREATE_REPORT: 'create-report',
  STATISTICS: 'statistics',
  ONGOING_REPORT: 'ongoing-report'
}
export const homeTab = [
  {
    buttonText: import.meta.env.VITE_HOME_BUTTONTEXT_CREATE_REPORT,
    tabName: 'create-report'
  },
  {
    buttonText: import.meta.env.VITE_HOME_BUTTONTEXT_STATISTICS,
    tabName: 'statistics'
  }
]
export const detailsPageTab = [
  {
    buttonText: import.meta.env.VITE_DETAILPAGETAB_BUTTONTEXT_ONGOING_REPORT,
    tabName: 'ongoing-report'
  },

  {
    buttonText: import.meta.env.VITE_DETAILPAGETAB_BUTTONTEXT_HISTORICAL_REPORT,
    tabName: 'historical-report'
  }
]

export const issueListTableHeaders = [
  { label: '#', className: '', scope: 'col' },
  { label: import.meta.env.VITE_JIRA_ID, className: '', scope: 'col' },
  { label: import.meta.env.VITE_CUSTOMER_NAME, className: '', scope: 'col' },
  { label: import.meta.env.VITE_MENU_CARD_ID, className: '', scope: 'col' },
  { label: import.meta.env.VITE_MENU_CARD_DESCRIPTION, className: '', scope: 'col' },
  { label: import.meta.env.VITE_TICKET_DESCRIPTION, className: '', scope: 'col' },
  { label: import.meta.env.VITE_SDO, className: '', scope: 'col' },
  { label: import.meta.env.VITE_SDM, className: '', scope: 'col' },
  { label: import.meta.env.VITE_CSM, className: '', scope: 'col' },
  { label: import.meta.env.VITE_ASSIGNED_DATE, className: '', scope: 'col' },
  { label: import.meta.env.VITE_CREATED_DATE, className: '', scope: 'col' },
  { label: import.meta.env.VITE_REPORT_STATUS, className: '', scope: 'col' },
  { label: import.meta.env.VITE_ACTION, className: '', scope: 'col' }
]