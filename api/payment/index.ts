import { AppConfig } from "../../constant/app";
import { PaymentBaseInterface } from "../../domain/payment/interfaces";
import { BaseApi } from "../base.api";

export class PaymentAPI extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public createPayment(body: PaymentBaseInterface): Promise<any> {
    return this.make('POST', 'api/payments', body)
  }
}