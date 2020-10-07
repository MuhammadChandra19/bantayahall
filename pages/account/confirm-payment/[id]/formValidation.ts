import * as Yup from 'yup';
export const validation = Yup.object({
  paymentReference: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Referensi pembayaran tidak boleh kosong'),
  paymentDate: Yup.string()
    .required('Tanggal pembayaran tidak boleh kosong')
});