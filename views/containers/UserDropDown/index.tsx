import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import userService from '../../../domain/user/service';

const UserDropDown = () => {
  const [isOverlayVisible, showOverlay] = useState(false)
  const { auth: { logout } } = userService();
  const dropDownItem = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            logout();
            window.location.href = "/"
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
