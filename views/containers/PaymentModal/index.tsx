import { ArrowUpOutlined } from '@ant-design/icons';
import { Button, Collapse, Modal, notification } from 'antd';
import React, { useEffect } from 'react';
import socketService from '../../../domain/socket /service';
import { toCurrency } from '../../../util/converter/currency';
import '../../styles/containers/paymentModal.less'
const { Panel } = Collapse;
interface PaymentModalInterface {
  visible: boolean;
  totalPayment: number;
  onClose: () => void;

}
const PaymentModal: React.FC<PaymentModalInterface> = ({ visible, onClose, totalPayment }) => {
  useEffect(() => {
    const { socket } = socketService();
    socket.on("PAYMENT_PUSH", ({ _, message }) => {
      notification.success({
        message: 'Success',
        description: message
      })
    })
    console.log(socket.id)
  }, [])

  const renderPanel = (content: React.ReactNode, image: string = null) => (
    <span>
      {image && <img src={image} style={{ width: 75, }} />}
      {content}
    </span>
  )

  const renderHeaderTotal = () => (
    <div style={{ display: 'block' }}>
      <p style={{ marginBottom: 0, fontSize: 12, color: 'blue' }}>Total</p>
      {toCurrency("RP", totalPayment)}
    </div>
  )
  return (
    <Modal
      className="payment-modal"
      title="Ticket Confirmation"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Collapse
        onChange={() => { }}
        expandIconPosition="right"
      >
        <Panel key="1" header={renderPanel("", "../image/bca.png")}>
          <div>
            <p style={{ marginBottom: 0, fontSize: 14 }}>Pembayaran dilakukan melalui transfer bank ke rekening :</p>
            <hr></hr>
            <table>
              <tr>
                <td style={{width:120, marginBottom: 0, fontSize: 14 }}>Rekening BCA</td>
                <td style={{width:20, marginBottom: 0, fontSize: 14 }}>:</td>
                <td style={{width:120, marginBottom: 0, fontSize: 14 }}>2190079999</td>
              </tr>
              <tr>
                <td>Nama Akun Bank</td>
                <td>:</td>
                <td>Moh Rival Himran</td>
              </tr>
            </table>
          </div>
        </Panel>
        <Panel key="2" header={renderPanel("","../image/gopay.png")}>
          <div>Scan Barcode with your Gojek Application</div>
        </Panel>
        <Panel key="3" header={renderPanel(renderHeaderTotal())}>
          <div>Scan Barcode with your Gojek Application</div>
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default PaymentModal;