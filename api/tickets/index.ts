import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { TicketInterface } from "../../domain/tickets/interface";

export class TicketsAPI extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async getTicketById(id: string): Promise<{ status: boolean }> {
    return this.make('GET', `api/tickets/user/${id}`);
  }
}