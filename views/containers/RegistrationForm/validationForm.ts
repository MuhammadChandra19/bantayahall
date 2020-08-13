import * as Yup from 'yup';
export const validation = Yup.object({
  username: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Username is required'),
  password: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  email: Yup.string()
    .max(254, 'Must be 254 characters or less')
    .email('Invalid email address')
    .required('Email is required'),
  confirmationPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    )
});