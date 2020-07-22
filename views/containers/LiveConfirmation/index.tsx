import React from 'react';
import { Modal, Input, Select, Button } from 'antd';
import '../../styles/containers/liveStreamConfirmation.less';
const { Option } = Select;

interface LiveConfirmationProps {
  isLiveStarted: boolean;
  liveNow: () => void;

}
const LiveConfirmation: React.FC<LiveConfirmationProps> = ({ isLiveStarted, liveNow }) => {
  return (
    <Modal
      visible={!isLiveStarted}
      closable={false}
      footer={null}
      title="Live stream info"
      className="confirmation-container"
    >
      <div style={{ display: 'grid' }}>
        <Input style={{ width: '100%' }} placeholder="title" />
        <Select defaultValue="Public" style={{ width: '100%' }} >
          <Option value="Public">Public</Option>
          <Option value="Private">Private</Option>
        </Select>
        <Button style={{ marginLeft: 'auto' }} type="primary" onClick={liveNow}>Live Now</Button>
      </div>

    </Modal>
  );
};

export default LiveConfirmation;