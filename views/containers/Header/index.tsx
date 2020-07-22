import React from 'react';
import { Layout as AntLayout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import "../../styles/containers/header.less";
import layoutService from '../../../domain/layout/service';

const { Header } = AntLayout;
const AppHeader = () => {

  const { toggleSideBar } = layoutService();

  return (
    <Header className="bnth">
      <div className="header-container">
        <MenuOutlined onClick={() => toggleSideBar()} />
      </div>
    </Header>
  );
};

export default AppHeader;