import { PaymentAPI } from "../../../api/payment"
import { PaymentBaseInterface } from "../interfaces"

export const paymentService = () => {
  const paymentApi = new PaymentAPI()
  const confirmPayment = async (body: PaymentBaseInterface) => {
    try {
      await paymentApi.createPayment(body)
    } catch (e) {
      throw e
    }
  }
  return {
    confirmPayment
  }
}