import React from 'react';
import { Layout as AntLayout } from 'antd';
const { Sider } = AntLayout;
const AppSidebar = () => {
  return (
    <Sider theme="light">
      <div className="app-sidebar">
        sider
      </div>
    </Sider>
  );
};

export default AppSidebar;