import React from 'react';
import "../../styles/components/singleboxcontainer.less"
const SingleBoxContainer: React.FC = (props) => {
  return (
    <div className="single-box-form">
      <div className="single-box-form__content">
        {props.children}
      </div>
    </div>
  );
};

export default SingleBoxContainer;