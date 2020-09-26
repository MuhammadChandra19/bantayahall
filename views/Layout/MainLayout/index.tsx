import React, { useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import Head, { HeaderProps } from '../../components/Head';
import '../../styles/index.less';
import AppHeader from '../../containers/Header';
import AppSidebar, { AppSidebarProps } from '../../containers/SideBar';
import { accountService } from '../../../domain/user/service/accountService';
const { Content } = AntLayout;

interface LayoutProp extends HeaderProps, AppSidebarProps {

}
const Layout: React.FC<LayoutProp> = (props) => {
  const { getUserData } = accountService()
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
      <Head
        description={props.description}
        pageTitle={props.pageTitle}
        currentURL={props.currentURL}
        previewImage={props.previewImage}
        siteName={props.siteName}
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