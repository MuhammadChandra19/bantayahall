import React from 'react';

import '../../views/styles/pages/login.less';
import LoginForm from '../../views/containers/LoginForm';
const Login = () => {

  return (
    <div className="login-form">
      <div className="login-form__content">
        <LoginForm />
      </div>
    </div>

  );
};

export default Login;