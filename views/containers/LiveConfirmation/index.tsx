import React, { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import '../../styles/containers/liveStreamConfirmation.less';
import { LiveType } from '../../../domain/liveStream/interface';
import CopyClipBoard from '../../components/CopyClipBoard';
import liveStreamService from '../../../domain/liveStream/service';
const { Option } = Select;

interface LiveConfirmationProps {
  isVisible: boolean;
  liveNow: () => void;
  onCancel: () => void;
  liveId: string;
  userId: string;

}
const LiveConfirmation: React.FC<LiveConfirmationProps> = ({ isVisible, liveNow, onCancel, liveId, userId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [liveType, setLivetype] = useState('Public' as LiveType);
  const [isSubmitting, setSubmitting] = useState(false)
  const { initiateLiveStream } = liveStreamService();

  const initLiveStream = async () => {
    try {
      setSubmitting(true)
      await initiateLiveStream({ liveId, title, type: liveType, userId, description })
      liveNow()
    } catch (e) {
      message.error(e)
    } finally {
      setSubmitting(false)
    }

  }


  const liveSetting = (
    <React.Fragment>
      <Input
        style={{ width: '100%' }}
        placeholder="title"
        onChange={(value) => setTitle(value.target.value)}
      />
      <Input.TextArea
        style={{ width: '100%' }}
        rows={5}
        cols={5}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        defaultValue="Public"
        style={{ width: '100%' }}
        onChange={(e) => {
          setLivetype(e as LiveType)
        }}
      >
        <Option value="Public">Public</Option>
        <Option value="Private">Private</Option>
      </Select>
      <CopyClipBoard value={liveId} />
    </React.Fragment>
  );

  return (
    <Modal
      onCancel={onCancel}
      visible={isVisible}
      footer={null}
      closable={true}
      title="Live stream info"
      className="confirmation-container"
    >
      <div style={{ display: 'grid' }}>
        {liveSetting}
        <Button style={{ marginLeft: 'auto' }} type="primary" loading={isSubmitting} onClick={initLiveStream}>Live Now</Button>
      </div>

    </Modal>
  );
};

export default LiveConfirmation;