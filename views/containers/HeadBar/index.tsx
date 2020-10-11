import React, { useState } from 'react';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../../styles/containers/headbar.less'
import { Drawer } from 'antd';

const HeadBar = () => {
  const [isDrawerVisible, toggleDrawer] = useState(false)
  const drawerHeadBar = (
    <Drawer
      placement="top"
      visible={isDrawerVisible}
      key="top"
      onClose={() => toggleDrawer(false)}
      closable={false}
      className="drawer-headbar"
    >
      <ul className="nav-list--drawer">
        <li className="nav-item--drawer">
          <a href="#" className="nav-link-1">Home</a>
        </li>
        <li className="nav-item--drawer">
          <a href="/stream" className="nav-link-1">Stream</a>
        </li>
        <li className="nav-item--drawer">
          <a href="#" className="nav-link-1">About</a>
        </li>
        <li className="nav-item--drawer">
          <a href="/login" className="nav-link-1">Login</a>
        </li>
      </ul>
    </Drawer>
  )
  return (
    <header className="main">
      <div className="container">
        <nav>
          <div className="nav-brand">
            <a href="/">
              <img className="nav-logo" src="/image/BNTHLL-LOGO.png" />
            </a>
          </div>
          <div className="menu-icons open">
            <MenuOutlined onClick={() => toggleDrawer(!isDrawerVisible)} />
          </div>
          {drawerHeadBar}
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
              <a href="/login" className="nav-link">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeadBar;