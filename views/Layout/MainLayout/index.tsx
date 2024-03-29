import React, { useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import Head, { HeaderProps } from '../../components/Head';
import '../../styles/index.less';
import AppHeader from '../../containers/Header';
import AppSidebar, { AppSidebarProps } from '../../containers/SideBar';

import userService from '../../../domain/user/service';
import { useRouter } from 'next/router';
const { Content } = AntLayout;

interface LayoutProp extends HeaderProps, AppSidebarProps {

}
const Layout: React.FC<LayoutProp> = (props) => {
  const { account } = userService()
  const router = useRouter()
  useEffect(() => {
    account.getUserData()
  }, [])
  return (
    <>
      <Head
        description={props.description}
        pageTitle={props.pageTitle}
        currentURL={props.currentURL}
        previewImage={props.previewImage}
        siteName={props.siteName}
        subPath={props.subPath}
      />
      <AntLayout style={{ height: '100vh' }}>
        <AppHeader
        />
        <AntLayout>
          <AppSidebar
            useDrawer={props.useDrawer}
          />
          <Content
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >{props.children}</Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;