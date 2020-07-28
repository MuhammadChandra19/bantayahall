import React, { useEffect } from 'react';
import Layout from '../../../views/Layout/MainLayout';
import VideoPlayer from '../../../views/containers/VideoPlayer';


const Live = () => {

  return (
    <Layout
      useDrawer
      pageTitle="Live streaming"
      description="A band live streaming"
    >
      <VideoPlayer />
    </Layout>
  );
};

export default Live;