import React from 'react';
import Layout from '../../../views/Layout/MainLayout';
import StreamPlayback from '../../../views/containers/StreamPlayback';

const Stream = () => {
  return (
    <Layout
      useDrawer
      pageTitle="Live streaming"
      description="A band live streaming"
    >
      <StreamPlayback />
    </Layout>
  );
};

export default Stream;