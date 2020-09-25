import React from 'react';
import Layout from '../../../views/Layout/MainLayout';
import { useSelector } from 'react-redux';
import { AppState } from '../../../util/redux/store';
import { UserModel } from '../../../domain/user/model';
import { Tabs } from 'antd';
import PersonalInfo from '../../../views/containers/PersonalInfo';
const { TabPane } = Tabs
const Profile = () => {
  const state = useSelector<AppState, UserModel>(state => state.user.user)
  return (
    <Layout
      pageTitle={`${state.username} - Bantayahall`}
      description="live stream your favorite band"

    >
      <div
        style={{
          margin: 5,
          padding: 15,
          height: '100%',
          background: 'white',
          borderRadius: 4
        }}
      >
        <Tabs
          defaultActiveKey="personal-info"
        >
          <TabPane
            tab="Personal Information"
            key="personal-info"
          >
            <PersonalInfo />
          </TabPane>
          <TabPane
            tab="Personal Ticket"
            key="personal-ticket"
          >
            <p>ticket info</p>
          </TabPane>

        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;