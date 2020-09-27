import React, { useState } from 'react';
import { Menu, Dropdown, Avatar, Badge } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import userService from '../../../domain/user/service';
import { useRouter } from 'next/router';
import { AppState } from '../../../util/redux/store';

import { useSelector } from 'react-redux';

import { UserState } from '../../../domain/user/redux/states';


const UserDropDown = () => {
  const { user, isUserDatacomplete } = useSelector<AppState, UserState>(state => state.user)
  const [isOverlayVisible, showOverlay] = useState(false)
  const { auth: { logout } } = userService();
  const route = useRouter()
  const dropDownItem = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            route.push(`/profile/${user.username}`)
          }}
          icon={
            <UserOutlined />
          }
        >
          Profile {!isUserDatacomplete && <Badge color="red" />}
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
      overlayStyle={{ marginLeft: 'auto' }}
    >
      {
        !isUserDatacomplete ? (
          <Badge
            style={{ marginLeft: 'auto' }}
            dot
          >
            <Avatar
              size="large"
              style={{ marginLeft: 'auto' }}
              icon={<UserOutlined />}

            />
          </Badge>
        ) : (
            <Avatar
              size="large"
              style={{ marginLeft: 'auto' }}
              icon={<UserOutlined />}

            />
          )
      }
    </Dropdown>
  );
};

export default UserDropDown;
