import React from 'react';
import { Layout as AntLayout, Avatar } from 'antd';
import { MenuOutlined, UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import "../../styles/containers/header.less";
import layoutService from '../../../domain/layout/service';

const { Header } = AntLayout;
const AppHeader = () => {

  const { toggleSideBar } = layoutService();

  return (
    <Header className="bnth">
      <MenuOutlined onClick={() => toggleSideBar()} />
      <div className="action-header">
        <VideoCameraAddOutlined style={{ margin: 'auto' }} />
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;