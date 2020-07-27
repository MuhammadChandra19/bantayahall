import React, { useState } from 'react';
import { Modal, Input, Select, Button, Steps } from 'antd';
import '../../styles/containers/liveStreamConfirmation.less';
const { Option } = Select;
const { Step } = Steps;

interface LiveConfirmationProps {
  isVisible: boolean;
  liveNow: () => void;

}
const LiveConfirmation: React.FC<LiveConfirmationProps> = ({ isVisible, liveNow }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStep = (
    <Steps current={currentStep}>
      <Step title="Live settings" />
      <Step title="Live thumbnail" />
    </Steps>
  );

  const liveSetting = (
    <React.Fragment>
      <Input style={{ width: '100%' }} placeholder="title" />
      <Select defaultValue="Public" style={{ width: '100%' }} >
        <Option value="Public">Public</Option>
        <Option value="Private">Private</Option>
      </Select>
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
      <Button style={{ marginLeft: 'auto' }} type="primary" onClick={liveNow}>Live Now</Button>
    </div>
  )

  return (
    <Modal
      visible={isVisible}
      closable={false}
      footer={null}
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