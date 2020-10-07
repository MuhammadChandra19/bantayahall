import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SingleBoxContainer from '../../../../views/components/SingleBoxContainer';
import { PaymentBaseInterface } from '../../../../domain/payment/interfaces';
import { Button, DatePicker, Input, message } from 'antd';
import { Dict } from '../../../../util/types';
import moment from 'moment'
import { paymentService } from '../../../../domain/payment/services';

const ConfirmPayment = () => {
  const [isSubmiing, setSubmiting] = useState(false);
  const router = useRouter()
  const { id } = router.query as Dict<string>
  const initialValue: PaymentBaseInterface = {
    isValid: false,
    paymentDate: '',
    paymentKey: parseInt(id),
    paymentReference: ''
  }

  const [body, setBody] = useState(initialValue)



  const createPayment = async () => {
    if (!!!body.paymentDate || !!!body.paymentReference) {
      message.error('Mohon lengkapi form')
      return;
    }
    try {
      setSubmiting(true);
      await paymentService().confirmPayment(body)
      message.success("Pembayaran Berhasil, informasi pembayaran akan di kirimkan ke email terdaftar")
      router.push("/stream")
    } catch (e) {
      message.error('Terjadi kesalahan mohon coba kembali')
    } finally {
      setSubmiting(false)
    }
  }
  return (
    <SingleBoxContainer>
      <form >
        <h3>Konfirmasi Pembayaran</h3>
        <div className="from-input-container">
          <label htmlFor="firstName">Referensi Pembayaran</label>
          <Input
            type="text"
            id="paymentReference"
            value={body.paymentReference}
            onChange={(e) => setBody({ ...body, paymentReference: e.target.value })}
          />
        </div>
        <div className="from-input-container">
          <label htmlFor="firstName">Tanggal dan waktu pembayaran</label>
          <DatePicker
            showTime
            onChange={(date, dateString) => setBody({ ...body, paymentDate: date.toISOString() })}
            style={{ width: '100%' }}
          />
        </div>
        <Button
          style={{ margin: 5, width: '100%' }}
          htmlType="button"
          type="primary"
          loading={isSubmiing}
          onClick={createPayment}
        >
          Konfirmasi
        </Button>
      </form>
    </SingleBoxContainer>
  );
};

export default ConfirmPayment;