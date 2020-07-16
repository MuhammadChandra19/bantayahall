import React from 'react';
import { Layout as AntLayout } from 'antd';
import Head, { HeaderProps } from '../components/Head';
import '../styles/index.less';
import AppHeader from '../containers/Header';
import AppSidebar from '../containers/SideBar';
const { Content } = AntLayout;

interface LayoutProp extends HeaderProps {

}
const Layout: React.FC<LayoutProp> = (props) => {
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
        <AppHeader />
        <AntLayout>
          <AppSidebar />
          <Content
            style={{
              padding: 24,
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