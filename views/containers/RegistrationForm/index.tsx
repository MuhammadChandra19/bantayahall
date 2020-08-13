import React, { useState } from 'react';
import { useFormik } from 'formik';
import { UserRegister } from '../../../domain/user/model';
import { validation } from './validationForm';
import { useRouter } from 'next/router'
import { Input, Button, message } from 'antd';
import userService from '../../../domain/user/service';
interface RegistrationFormInterface extends UserRegister {
  confirmationPassword: string;
}
const RegistrationForm = () => {
  const [isSubmiing, setSubmiting] = useState(false);
  const { register } = userService();
  const router = useRouter()

  const initialValues: RegistrationFormInterface = {
    email: '',
    password: '',
    username: '',
    confirmationPassword: '',
  }

  const registerUser = async (values: RegistrationFormInterface) => {
    setSubmiting(true);

    try {
      delete values.confirmationPassword;
      await register.registerNewUser(values);
      router.push("/")
    } catch (e) {
      message.error("Failed to add new user")
    } finally {
      setSubmiting(false)
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: registerUser
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3><strong>BANTAYA</strong>HALL</h3>
      <div className="from-input-container">
        <label htmlFor="firstName">Username</label>
        <Input type="text" id="username" {...formik.getFieldProps('username')} />
        {formik.touched.username && formik.errors.username ? (
          <span className="error-info">{formik.errors.username}</span>
        ) : null}
      </div>
      <div className="from-input-container">
        <label htmlFor="email">Email Address</label>
        <Input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="error-info">{formik.errors.email}</span>
        ) : null}
      </div>
      <div className="from-input-container">
        <label htmlFor="password">Password</label>
        <Input.Password id="password" type="password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password ? (
          <span className="error-info">{formik.errors.password}</span>
        ) : null}
      </div>
      <div className="from-input-container">
        <label htmlFor="confirmationPassword">Confirmation Password</label>
        <Input.Password id="confirmationPassword" type="password" {...formik.getFieldProps('confirmationPassword')} />
        {formik.touched.confirmationPassword && formik.errors.confirmationPassword ? (
          <span className="error-info">{formik.errors.confirmationPassword}</span>
        ) : null}
      </div>
      <Button
        style={{ margin: 5, width: '100%' }}
        htmlType="submit"
        type="primary"
        loading={isSubmiing}
      >
        Submit
      </Button>

    </form>
  );
};

export default RegistrationForm;