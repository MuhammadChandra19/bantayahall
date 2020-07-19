import React, { useState } from 'react';
import { Layout as AntLayout, Drawer } from 'antd';
const { Sider } = AntLayout;

export interface AppSidebarProps {
  useDrawer?: boolean
}
const AppSidebar: React.FC<AppSidebarProps> = ({
  useDrawer = false
}) => {
  const [drawerVisible, setDrawerVisibility] = useState(false);

  const content = () => (
    <div className="app-sidebar">
      sider
    </div>
  )
  return (
    !useDrawer ? (
      <Sider theme="light">
        {content()}
      </Sider>
    ) :
      <Drawer
        placement="left"
        visible={drawerVisible}
        key="left"
        closable={false}
        onClose={() => setDrawerVisibility(false)}
      >
        {content()}
      </Drawer>

  );
};

export default AppSidebar;