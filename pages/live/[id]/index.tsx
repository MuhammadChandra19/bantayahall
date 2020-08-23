import React, { useEffect } from 'react';
import Layout from '../../../views/Layout/MainLayout';
// import VideoPlayer from '../../../views/containers/VideoPlayer';
import { useRouter } from 'next/router';


const Live = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout
      useDrawer
      pageTitle="Live streaming"
      description="A band live streaming"
    >
      {/* <VideoPlayer liveID={id} /> */}
    </Layout>
  );
};

export default Live;