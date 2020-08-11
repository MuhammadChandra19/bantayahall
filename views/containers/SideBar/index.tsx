import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Drawer, Button } from 'antd';
import { useSelector } from 'react-redux';
import { LayoutState } from '../../../domain/layout/redux/states';
import { AppState } from '../../../util/redux/store';
import socketService from '../../../domain/socket/service';

import layoutService from '../../../domain/layout/service';
const { Sider } = AntLayout;

export interface AppSidebarProps {
  useDrawer?: boolean
}
const AppSidebar: React.FC<AppSidebarProps> = ({
  useDrawer = false
}) => {
  const { toggleSideBar } = layoutService();
  const { isSideBarVisible } = useSelector<AppState, LayoutState>(state => ({
    isSideBarVisible: state.layout.isSideBarVisible
  }))

  const resetSocket = () => {
    socketService().socket.emit('reset-socket');
  }

  useEffect(() => {

  }, [])

  const content = () => (
    <div className="app-sidebar">
      sider
      <Button onClick={resetSocket}>Reset</Button>
    </div>
  )
  return (
    !useDrawer ? (
      <Sider
        collapsible
        collapsed={isSideBarVisible}
        onCollapse={() => toggleSideBar(false)}
        theme="light"
      >
        {content()}
      </Sider>
    ) :
      <Drawer
        placement="left"
        visible={isSideBarVisible}
        key="left"
        closable={false}
        onClose={() => toggleSideBar(false)}
      >
        {content()}
      </Drawer>

  );
};

export default AppSidebar;