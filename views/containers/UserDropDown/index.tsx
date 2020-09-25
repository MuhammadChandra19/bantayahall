import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import userService from '../../../domain/user/service';
import { useRouter } from 'next/router';
import { AppState } from '../../../util/redux/store';

import { useSelector } from 'react-redux';
import { UserModel } from '../../../domain/user/model';

const UserDropDown = () => {
  const state = useSelector<AppState, UserModel>(state => state.user.user)
  const [isOverlayVisible, showOverlay] = useState(false)
  const { auth: { logout } } = userService();
  const route = useRouter()
  const dropDownItem = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            route.push(`/profile/${state.username}`)
          }}
          icon={<UserOutlined />}
        >
          Profile
        </Menu.Item>
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
