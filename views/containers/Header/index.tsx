import React, { useState } from 'react';
import { Layout as AntLayout, Avatar } from 'antd';
import { MenuOutlined, UserOutlined, VideoCameraAddOutlined, UserAddOutlined } from '@ant-design/icons';
import "../../styles/containers/header.less";
import layoutService from '../../../domain/layout/service';
import DropdownHeader from '../DropdownHeader'
import { AppState } from '../../../util/redux/store';
import { UserModel } from '../../../domain/user/model';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import UserDropDown from '../UserDropDown';

const { Header } = AntLayout;
const AppHeader = () => {
  const user = useSelector<AppState, UserModel>(state => state.user.user)
  const { toggleSideBar } = layoutService();
  const router = useRouter()

  return (
    <Header className="bnth">
      <MenuOutlined onClick={() => toggleSideBar()} />
      <div className="action-header">
        <DropdownHeader userId={user?.id} />
        {
          user?.id ?
            (<UserDropDown />) :
            (
              <Avatar
                size="large"
                style={{ marginLeft: 'auto' }}
                icon={<UserAddOutlined onClick={() => router.push("/login")} />}

              />
            )
        }

      </div>
    </Header>
  );
};

export default AppHeader;