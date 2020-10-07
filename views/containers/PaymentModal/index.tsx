import { Button, Collapse, Modal, Radio, Result } from 'antd';
import React, { useState } from 'react';
import { toCurrency } from '../../../util/converter/currency';
import '../../styles/containers/paymentModal.less'
import QRCode from 'qrcode.react'
import { PaymentType } from '../../../domain/tickets/interface'
import { RadioChangeEvent } from 'antd/lib/radio';
import { DownCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
interface PaymentModalInterface {
  visible: boolean;
  price: number;
  onClose: () => void;
  gopayQr?: string;
  qty: number;
  onProceed: (type: PaymentType) => void
  loading: boolean
  hasError: boolean

}
const PaymentModal: React.FC<PaymentModalInterface> = ({
  visible,
  onClose,
  price,
  gopayQr = null,
  qty,
  loading,
  hasError,
  onProceed
}) => {
  const [selectedPayment, setSelectedPayment] = useState(null as PaymentType)
  const [totalPayment, setTotalPayment] = useState(price * qty)

  const onChecked = (e: RadioChangeEvent, type: PaymentType) => {
    e.stopPropagation()
    if (e.target.checked) {
      if (type === "GOPAY") {
        setTotalPayment(totalPayment + 2000)
      } else if (totalPayment > (price * qty)) {
        setTotalPayment(totalPayment - 2000)
      }
      setSelectedPayment(type)
    }
  }

  const proceedPayment = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    onProceed(selectedPayment)
  }
  const renderPanel = (content: React.ReactNode, image: string = null, type: PaymentType = null) => (
    <span>
      {
        type &&
        <Radio
          onChange={e => onChecked(e, type)}
          checked={selectedPayment === type}
          value={type}
        >
          <img src={image} style={{ width: 75, }} />
        </Radio>
      }
      {content}
    </span>
  )

  const errorProcessing = (
    <Result
      status="500"
      subTitle="Sorry, something went wrong."
    />
  )

  const renderHeaderTotal = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '105%' }}>
      <div style={{ display: 'block' }}>
        <p style={{ marginBottom: 0, fontSize: 12, color: 'blue' }}>Total <DownCircleOutlined style={{ marginLeft: 5 }} /></p>
        {toCurrency("RP", totalPayment)}
      </div>
      <Button disabled={!!!selectedPayment} onClick={proceedPayment} style={{ margin: 'auto 0' }} type="primary">Bayar</Button>
    </div>
  )

  const renderQr = (
    <div style={{ textAlign: 'center', padding: 10 }}>

      <QRCode value={gopayQr} size={300} />

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <img src="../image/gopay.png" style={{ width: 75, height: 20, margin: 'auto 0' }} />
        <h2 style={{ margin: 5 }}>{toCurrency("RP", totalPayment)}</h2>
      </div>

    </div>
  )
  return (
    <Modal
      className="payment-modal"
      title="Pilih metode pembayaran"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {
        hasError ? (errorProcessing)
          : !!gopayQr && !loading ? (renderQr)
            : <Collapse
              onChange={() => { }}
              expandIconPosition="right"
            >
              <Panel key="1" header={renderPanel("", "../image/bca.png", "MANUAL")}>
                <div>
                  <p style={{ marginBottom: 0, fontSize: 14 }}>Pembayaran dilakukan melalui transfer bank ke rekening :</p>
                  <hr></hr>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: 120, marginBottom: 0, fontSize: 14 }}>Rekening BCA</td>
                        <td style={{ width: 20, marginBottom: 0, fontSize: 14 }}>:</td>
                        <td style={{ width: 120, marginBottom: 0, fontSize: 14 }}>2190079999</td>
                      </tr>
                      <tr>
                        <td>Nama Akun Bank</td>
                        <td>:</td>
                        <td>Moh Rival Himran</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </Panel>
              <Panel key="2" header={renderPanel("", "../image/gopay.png", "GOPAY")}>
                <p style={{ marginBottom: 0 }}>
                  Scan Barcode dengan aplikasi GOJEK
            </p>
                <span style={{ color: 'grey', fontSize: 9, fontStyle: 'italic' }}>* terdapat tambahan biaya admin</span>
              </Panel>
              <Panel showArrow={false} key="3" header={renderPanel(renderHeaderTotal(), null, null)}>
                <div>
                  <p style={{ marginBottom: 0, fontSize: 14 }}>Rincian pembayaran :</p>
                  <hr></hr>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: 120, marginBottom: 0, fontSize: 14 }}>Harga Tiket</td>
                        <td style={{ width: 20, marginBottom: 0, fontSize: 14 }}>:</td>
                        <td style={{ width: 120, marginBottom: 0, fontSize: 14 }}>{toCurrency("RP", totalPayment)}</td>
                      </tr>
                      <tr>
                        <td>Jumlah Tiket</td>
                        <td>:</td>
                        <td>{qty}</td>
                      </tr>
                      {
                        selectedPayment === 'GOPAY' && (
                          <tr>
                            <td>Biaya Admin</td>
                            <td>:</td>
                            <td>{toCurrency("RP", 2000)}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </Panel>
            </Collapse>
      }
    </Modal>
  );
};

export default PaymentModal;