import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const UserDropDown = () => {
  const [isOverlayVisible, showOverlay] = useState(false)
  const dropDownItem = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            localStorage.clear()
            window.location.href = "/stream"
          }}
          icon={<LogoutOutlined />}
        >
          Log out
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <Dropdown
      overlay={dropDownItem}
      placement="bottomCenter"
      onVisibleChange={(visible) => showOverlay(visible)}
      visible={isOverlayVisible}
    >
      <Avatar
        size="large"
        style={{ marginLeft: 'auto' }}
        icon={<UserOutlined />}

      />
    </Dropdown>
  );
};

export default UserDropDown;
