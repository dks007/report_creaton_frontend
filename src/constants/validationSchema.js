import * as Yup from 'yup'
export const createReportValidationSchema = Yup.object().shape({
  jira_id: Yup.string().required('Jira ID is required'),
  customer_name: Yup.string().required('Customer Name is required'),
  expert_name: Yup.string().required('Expert Name is required'),
  creator_name: Yup.string().required('Creator Name is required'),
  menuCard: Yup.object().shape({
    value: Yup.number().required('Product is required'),
    label: Yup.string()
  }),
  product: Yup.object().shape({
    value: Yup.number().required('Product is required'),
    label: Yup.string()
  }),
  capability: Yup.object().shape({
    value: Yup.number().required('Capability is required'),
    label: Yup.string()
  }),
  sub_capability: Yup.object().shape({
    value: Yup.number().required('Sub capability is required'),
    label: Yup.string()
  })
})
