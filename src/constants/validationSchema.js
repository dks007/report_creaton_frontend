import * as Yup from 'yup'
export const validationSchema = Yup.object().shape({
  jira_id: Yup.string().required('Jira ID is required'),
  customer_name: Yup.string().required('Customer Name is required'),
  expert_name: Yup.string().required('Expert Name is required'),
  creator_name: Yup.string().required('Creator Name is required')
})
