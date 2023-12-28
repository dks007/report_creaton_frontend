import * as yup from 'yup'
import { CUSTOMER_NAME } from './messages'

export const createReportSchema = yup.object({
  customer_name: yup.string().required(`${CUSTOMER_NAME}`)
})
