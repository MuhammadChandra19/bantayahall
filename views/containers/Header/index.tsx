import React from 'react';
import { Layout as AntLayout, Avatar } from 'antd';
import { MenuOutlined, UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import "../../styles/containers/header.less";
import layoutService from '../../../domain/layout/service';
import DropdownHeader from '../DropdownHeader'

const { Header } = AntLayout;
const AppHeader = () => {

  const { toggleSideBar } = layoutService();

  return (
    <Header className="bnth">
      <MenuOutlined onClick={() => toggleSideBar()} />
      <div className="action-header">
        <DropdownHeader />
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;