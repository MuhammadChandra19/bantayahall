import React, { useState } from 'react';
import { Input, Row, Col, Checkbox, Button } from 'antd';
import '../../views/styles/pages/login.less';
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ userName: false, password: false, error: false });

  const signIn = () => {
    if (userName === "") {
      setError({ ...error, userName: true, error: true })
    }
    if (password === "") {
      setError({ ...error, password: true, error: true })
    }

    if (!error.error) {
      console.log(userName, password);
    }

  }

  return (
    <div className="login-form">
      <div className="login-form__content">
        <h1>Login</h1>
        <div className="login-form__content__input">
          <Input
            className="login-form__content__input__username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          {error.userName && <span className="error">Username cannot be empty!</span>}
          <Input.Password
            className="login-form__content__input__password"
            placeholder="Password" onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <span className="error">Password cannot be empty!</span>}
          <Button style={{ width: '100%' }} type="primary" onClick={signIn}>Sign In</Button>
        </div>
      </div>
    </div>

  );
};

export default Login;