import * as Yup from 'yup';
export const validation = Yup.object({
  username: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Username is required'),
  password: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Password is required')
});