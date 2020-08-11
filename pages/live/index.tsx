import React, { useEffect } from 'react';
import Layout from '../../views/Layout/MainLayout';
import VideoPlayer from '../../views/containers/VideoPlayer';
import { useRouter } from 'next/router';


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