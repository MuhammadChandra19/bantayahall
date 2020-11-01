import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SingleBoxContainer from '../../../../views/components/SingleBoxContainer';
import { PaymentBaseInterface } from '../../../../domain/payment/interfaces';
import { Button, DatePicker, Input, message, Upload } from 'antd';
import { Dict } from '../../../../util/types';
import { paymentService } from '../../../../domain/payment/services';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

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

  const dummyRequest = ({ onSuccess }) => {
    onSuccess('uploading')
    setTimeout(() => {
      onSuccess('done')
    }, 500)
  }

  const beforeUpload = (file: RcFile) => {
    // const isJPG = file.type === 'image/jpeg'
    const arrType = ['image/jpeg', 'image/gif', 'image/png']
    if (arrType.indexOf(file.type) < 0) {
      message.error('You can only upload JPG, GIF and PNG file!')
    }
    const isLt2M = file.size / 800 / 800 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 800k!')
    }
    return isLt2M
  }

  const getBase64 = (img: File | Blob, callback: (string) => any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (paymentReference) => setBody({ ...body, paymentReference }))
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

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
        <div className="from-input-container">
          <label htmlFor="firstName">Bukti Pembayaran</label>
          <Upload
            name="file"
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
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