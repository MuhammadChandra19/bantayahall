import React from 'react';
import Layout from '../../../views/Layout/MainLayout';
import { useSelector } from 'react-redux';
import { AppState } from '../../../util/redux/store';
import { Badge, Tabs } from 'antd';
import PersonalInfo from '../../../views/containers/PersonalInfo';
import { UserState } from '../../../domain/user/redux/states';
const { TabPane } = Tabs

import { useRouter } from 'next/router';
import UserTicket from '../../../views/containers/UserTicket';

const Profile = () => {
  const { user, isUserDatacomplete } = useSelector<AppState, UserState>(state => state.user)
  const route = useRouter()
  const { username } = route.query

  return (
    <Layout
      pageTitle={`${username} - Bantayahall`}
      description="live stream your favorite band"
      subPath="../"
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
            tab={<div>Informasi Pribadi {!isUserDatacomplete && <Badge color="red" />} </div>}
            key="personal-info"
          >
            <PersonalInfo {...user} />
          </TabPane>
          <TabPane
            tab="History Pembelian Tiket"
            key="personal-ticket"
          >
            <UserTicket />
          </TabPane>

        </Tabs>
      </div>
    </Layout>
  )

};

export default Profile;