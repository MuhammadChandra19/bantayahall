import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Descriptions } from 'antd';
const { Item } = Descriptions;
interface LiveSummaryProps {
  isVisible: boolean;
  liveStreamTime: string;
  title: string;
  contentViewer: string;
}
const LiveSummary: React.FC<LiveSummaryProps> = ({ isVisible, }) => {
  return (
    <Modal
      visible={isVisible}
      closable={false}
      footer={null}
      title="Live stream summary"
    >
      <Descriptions>
        <Item label="Title">{}</Item>
        <Item label="Content Viewer">{}</Item>
        <Item label="Time Passed">{}</Item>
      </Descriptions>
    </Modal>
  );
};

export default LiveSummary;