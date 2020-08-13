import React from 'react';
import "../../views/styles/pages/register.less"
import RegistrationForm from '../../views/containers/RegistrationForm';

const Register = () => {


  return (
    <div className="register-form">
      <div className="register-form__content">
        <RegistrationForm />
      </div>
    </div>

  );
};

export default Register;