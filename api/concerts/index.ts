import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { ConcertsModel } from "../../domain/concert/interface";
import { BaseParamsInterface } from "../../util/types";

export class ConcertsAPI extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async GetConcertList(params: BaseParamsInterface): Promise<Array<ConcertsModel>> {
    return this.make('GET', 'api/concerts/count-ticket', { ...params });
  }
}