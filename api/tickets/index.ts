import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { TicketInterface, BuyTicketInterface } from "../../domain/tickets/interface";

export class TicketsAPI extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async getTicketById(id: string, concertid: string): Promise<{ status: boolean }> {
    return this.make('GET', `api/tickets/user/${id}/${concertid}`);
  }

  public async generatePayments(ticket: BuyTicketInterface): Promise<any> {
    return this.make('POST', 'api/tickets/buy', ticket);
  }

  public async getHistoryTicket(): Promise<Array<TicketInterface>> {
    return this.make('GET', 'api/tickets')
  }
}