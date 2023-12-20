import * as yup from 'yup';
import { CUSTOMER_NAME } from './messages';

export const craeteReportSchema = yup.object({
    customer_name: yup.string().required(`${CUSTOMER_NAME}`),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  });
  