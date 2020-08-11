import React from 'react';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../../styles/containers/headbar.less'

const HeadBar = () => {
  return (
    <header className="main">
      <div className="container">
        <nav>
          <div className="nav-brand">
            <a href="/">

            </a>
          </div>
          <div className="menu-icons open">
            <MenuOutlined />
          </div>
          <ul className="nav-list">
            <div className="menu-icons close">
              <CloseCircleOutlined />
            </div>
            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/stream" className="nav-link">Stream</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Register</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeadBar;