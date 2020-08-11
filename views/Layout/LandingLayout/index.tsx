import React from 'react';
import Head, { HeaderProps } from '../../components/Head';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import HeadBar from '../../containers/HeadBar';
import '../../styles/index.less'
interface LandingLayoutProps extends HeaderProps {

}
const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  return (
    <>
      <Head
        description={props.description}
        pageTitle={props.pageTitle}
        currentURL={props.currentURL}
        previewImage={props.previewImage}
        siteName={props.siteName}
      />
      <HeadBar />
      <div>{props.children}</div>
    </>
  );
};

export default LandingLayout;