import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Drawer, Button, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { LayoutState } from '../../../domain/layout/redux/states';
import { AppState } from '../../../util/redux/store';
import Link from 'next/link'

import layoutService from '../../../domain/layout/service';
import { AlertOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import sideBarRoute from '../../../util/routes/sideBarRoute';
const { Sider } = AntLayout;

export interface AppSidebarProps {
  useDrawer?: boolean
}
const AppSidebar: React.FC<AppSidebarProps> = ({
  useDrawer = false
}) => {
  const { toggleSideBar, setActiveSideBarMenu } = layoutService();
  const router = useRouter();
  const { isSideBarVisible, activeSideBarMenu } = useSelector<AppState, LayoutState>(state => ({
    isSideBarVisible: state.layout.isSideBarVisible,
    activeSideBarMenu: state.layout.activeSideBarMenu
  }));


  useEffect(() => {
    const path = router.pathname
    setActiveSideBarMenu(sideBarRoute[path])
  }, [])

  const content = () => (
    <Menu
      mode="inline"
      activeKey={activeSideBarMenu}
      selectedKeys={[activeSideBarMenu]}
    >
      <Menu.Item key="1" icon={<PlayCircleOutlined />}>
        <Link href="/stream">
          <a>
            Stream
          </a>

        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<AlertOutlined />}>
        <Link href="/upcoming">
          <a>
            Upcoming
          </a>

        </Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      {
        !useDrawer ? (
          <Sider
            className="sidebar-bnth"
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
            className="sidebar-bnth--drawer-left"
            visible={isSideBarVisible}
            key="left"
            closable={false}
            onClose={() => toggleSideBar(false)}
          >
            {content()}
          </Drawer>

      }
      <Drawer
        placement="top"
        className="sidebar-bnth--drawer-top"
        visible={isSideBarVisible}
        key="top"
        closable={false}
        onClose={() => toggleSideBar(false)}
      >
        {content()}
      </Drawer>

    </>
  );
};

export default AppSidebar;