import React, { useState } from 'react';
import { Row, Col, Avatar, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { AppState } from '../../../util/redux/store';
import { UserMainModel, UserModel } from '../../../domain/user/model';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { SET_USER_DATA } from '../../../domain/user/redux/actions';
import userService from '../../../domain/user/service';
import { UserState } from '../../../domain/user/redux/states';

const { TextArea } = Input

interface PersonalInfoState {
  user: UserModel;
  isSubmitting: boolean
}

const PersonalInfo: React.FC<any> = () => {
  const { account } = userService()
  const { isSubmitting, user } = useSelector<AppState, PersonalInfoState>(state => ({
    isSubmitting: state.common.loading[SET_USER_DATA],
    user: state.user.user
  }))

  const initialdata: UserMainModel = {
    address: user.address,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    langKey: user.langKey,
    id: user.id,
    phone: user.phone,
    postalCode: user.postalCode,
    username: user.username
  }

  const [data, setData] = useState(initialdata)

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

  const warningSuffix = (complete: boolean) => {
    return complete ? { suffix: <span /> } : {
      suffix: <InfoCircleOutlined style={{ color: 'red' }} />
    }
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
          <Input
            placeholder="First name"
            value={data.firstName}
            {...warningSuffix(!!user.firstName)}
            style={{ width: '100%', marginBottom: 15 }}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <Input
            value={data.lastName}
            placeholder="Last name"
            {...warningSuffix(!!user.lastName)}
            style={{ width: '100%', marginBottom: 15 }}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          <Input
            value={data.phone}
            placeholder="Phone" {...warningSuffix(!!user.phone)}
            style={{ width: '100%', marginBottom: 15 }}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          <TextArea
            value={data.address}
            placeholder="address"
            {...warningSuffix(!!user.address)}
            style={{ width: '100%', marginBottom: 15 }}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            rows={4}
          />
          <Button
            type="primary"
            loading={isSubmitting}
            onClick={() => account.updateUserData(data)}
          >
            Save
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default PersonalInfo;