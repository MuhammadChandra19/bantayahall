import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validation } from './validationForm';
import { LoginModel } from '../../../domain/user/model';
import { Input, Button, Checkbox, message } from 'antd';
import userService from '../../../domain/user/service';
import { useRouter } from 'next/router';
const LoginForm = () => {
  const [isSubmiing, setSubmiting] = useState(false);
  const { auth } = userService();
  const router = useRouter()

  const initialValues: LoginModel = {
    password: '',
    rememberMe: false,
    username: ''
  }

  const authenticateUser = async (values: LoginModel) => {
    setSubmiting(true);
    try {
      await auth.login(values);
      router.push("/stream");
    } catch (e) {
      message.error("Failed to login please try again")
    } finally {
      setSubmiting(false)
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: authenticateUser
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
        <label htmlFor="password">Password</label>
        <Input.Password id="password" type="password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password ? (
          <span className="error-info">{formik.errors.password}</span>
        ) : null}
      </div>
      <div className="from-input-container">
        <Checkbox {...formik.getFieldProps('rememberMe')}>Remember me!</Checkbox>
      </div>
      <Button
        style={{ margin: 5, width: '100%' }}
        htmlType="submit"
        type="primary"
        loading={isSubmiing}
      >
        Submit
      </Button>
      <span style={{ color: 'grey' }}>don't have account?.. <a href="/register">Register</a></span>
    </form>
  );
};

export default LoginForm;