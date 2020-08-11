import React from 'react';
import Layout from '../../../views/Layout/MainLayout';
// import StreamPlayback from '../../../views/containers/StreamPlayback';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

const Stream = () => {
  const router = useRouter()
  const { id, isLive } = router.query
  const StreamPlaybackWithNoSSR = dynamic(() => import('../../../views/containers/StreamPlayback'), {
    ssr: false
  })
  return (
    <Layout
      useDrawer
      pageTitle="Live streaming"
      description="A band live streaming"
    >
      <StreamPlaybackWithNoSSR
        isLive={isLive === "true"}
        mediaId={id}


      />
    </Layout>
  );
};

export default Stream;