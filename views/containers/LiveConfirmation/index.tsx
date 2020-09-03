import React, { useState } from 'react';
import { Modal, Input, Select, Button, Steps, message } from 'antd';
import '../../styles/containers/liveStreamConfirmation.less';
// import socketService from '../../../domain/socket/service';
import { LiveType } from '../../../domain/liveStream/interface';
import { create_UUID } from '../../../util/uuid';
import CopyClipBoard from '../../components/CopyClipBoard';
import liveStreamService from '../../../domain/liveStream/service';
const { Option } = Select;
const { Step } = Steps;

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
  const [liveType, setLivetype] = useState('Public' as LiveType);
  const [isSubmitting, setSubmitting] = useState(false)
  const { initiateLiveStream } = liveStreamService();

  const initLiveStream = async () => {
    try {
      setSubmitting(true)
      await initiateLiveStream({ liveId, title, type: liveType, userId })
      liveNow()
    } catch (e) {
      message.error(e)
    } finally {
      setSubmitting(false)
    }

  }

  const renderStep = (
    <Steps current={currentStep}>
      <Step title="Live settings" />
      <Step title="Live thumbnail" />
    </Steps>
  );

  const liveSetting = (
    <React.Fragment>
      <Input
        style={{ width: '100%' }}
        placeholder="title"
        onChange={(value) => setTitle(value.target.value)}
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

  const takeThumbnail = (
    <h1>thumbnail</h1>
  )

  const viewStepIndex = (index: number) => {
    if (index === 0) {
      return liveSetting;
    }
    return takeThumbnail;

  }

  const renderButtonGroup = (
    <div
      className="group"
      style={{ marginLeft: 'auto' }}
    >
      <Button style={{ marginLeft: 'auto', marginRight: 5 }} onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
      <Button style={{ marginLeft: 'auto' }} type="primary" loading={isSubmitting} onClick={initLiveStream}>Live Now</Button>
    </div>
  )

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
        {renderStep}
        {viewStepIndex(currentStep)}
        {
          currentStep === 1 ?
            renderButtonGroup
            : <Button style={{ marginLeft: 'auto' }} type="primary" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
        }

      </div>

    </Modal>
  );
};

export default LiveConfirmation;