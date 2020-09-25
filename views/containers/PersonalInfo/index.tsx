import React from 'react';
import { Row, Col, Avatar, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { AppState } from '../../../util/redux/store';
import { UserModel } from '../../../domain/user/model';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input

const PersonalInfo = () => {
  const user: UserModel = useSelector<AppState, UserModel>(state => state.user.user)

  const getAvatarProps = () => {
    if (user.imageUrl) {
      return {
        src: user.imageUrl
      }
    }
    return {
      icon: <UserOutlined />
    }
  }

  const hasFullName = () => {
    return !!user.firstName || !!user.lastName
  }

  const getUserFullName = () => {
    const firstName = user.firstName ? user.firstName : ''
    const lastName = user.lastName ? user.lastName : ''
    return `${firstName} ${lastName}`
  }
  return (
    <Row>
      <Col span={7}>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={200} {...getAvatarProps()} style={{ margin: 'auto', display: 'block' }} />
          {
            hasFullName() && <h1 style={{ fontSize: 26, marginBottom: 1 }}>{getUserFullName()}</h1>
          }

          <h3 style={{ color: '#666' }}>{user.username}</h3>
        </div>

      </Col>
      <Col span={17}>
        <div>
          <Input placeholder="First name" style={{ width: '100%', marginBottom: 15 }} />
          <Input placeholder="Last name" style={{ width: '100%', marginBottom: 15 }} />
          <Input placeholder="Phone" style={{ width: '100%', marginBottom: 15 }} />
          <TextArea placeholder="address" style={{ width: '100%', marginBottom: 15 }} rows={4} />
          <Button type="primary">Save</Button>
        </div>
      </Col>
    </Row>
  );
};

export default PersonalInfo;