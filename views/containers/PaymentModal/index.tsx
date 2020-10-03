import { Collapse, Modal, notification } from 'antd';
import React, { useEffect } from 'react';
import socketService from '../../../domain/socket /service';
const { Panel } = Collapse;
interface PaymentModalInterface {
  visible: boolean;
  onClose: () => void;

}
const PaymentModal: React.FC<PaymentModalInterface> = ({ visible, onClose }) => {
  useEffect(() => {
    const { socket } = socketService();
    socket.on("PAYMENT_PUSH", (message) => {
      notification.success(message)
    })
    console.log(socket.id)
  }, [])

  const renderPanel = (image: string, content: React.ReactNode) => (
    <span>
      <img src={image} style={{ width: 75 }} />
      {content}
    </span>
  )
  return (
    <Modal
      title="Ticket Confirmation"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Collapse
        defaultActiveKey={['1']}
        onChange={() => { }}
        expandIconPosition="right"
      >
        <Panel key="1" header={renderPanel("../image/bca.png", <div>Manual transfer</div>)}>
          <div>bayar dengan transfer</div>
        </Panel>
        <Panel key="2" header={renderPanel("../image/gopay.png", <div>Gopay</div>)}>
          <div>bayar dengan gopay</div>
        </Panel>
      </Collapse>
      <div>
        <h3>Total</h3>
      </div>
    </Modal>
  );
};

export default PaymentModal;