import * as Yup from 'yup'
export const createReportValidationSchema = Yup.object().shape({
  jira_id: Yup.string().required('Jira ID is required'),
  customer_name: Yup.string(),
  expert_name: Yup.string(),
  creator_name: Yup.string(),
  customer_card: Yup.object().shape({
    value: Yup.number().required('Customer Card is required'),
    label: Yup.string()
  }),
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



// export const val= Yup.object().shape({
//   jira_id: Yup.string().required('Jira ID is required'),
//   customer_name: Yup.string().required('Customer Name is required'),
//   creator_name: Yup.string().required('Creator Name is required'),
//   menuCard: Yup.string().required('Menu Card is required'),
//   product: Yup.string().required('Product is required'),
//   capability: Yup.string().required('Capability is required'),
//   sub_capability: Yup.string().required('Sub Capability is required'),
//   snow_case_no: Yup.string().required('Snow Case No is required'),
// }),