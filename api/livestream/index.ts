import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { LiveStreamModel, LiveStreamAPIModel } from "../../domain/liveStream/interface";
import { Dict, APIresponse } from "../../util/types";

export class LiveStreamAPI extends BaseApi {
  constructor() {
    super(AppConfig.STREAM_URL)
  }

  public async newLiveStream(data: LiveStreamModel): Promise<LiveStreamAPIModel> {
    return this.make('POST', '/livestream', data)
  }

  public async loadListActiveLiveStream(limit: number, page: number): Promise<APIresponse<Dict<LiveStreamAPIModel>>> {
    return this.make('GET', '/livestream', { limit, page })
  }
}