import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { IMessageClient } from '../../domain/liveStream/interface'
import { CommonHttpReturn } from "../../util/types";

export class SocketQueue extends BaseApi {
  constructor() {
    super(AppConfig.SOCKET_QUEUE)
  }

  public async sendMessage(message: IMessageClient): Promise<CommonHttpReturn<IMessageClient>> {
    return this.make('POST', 'chat', message);
  }

  public async joinLiveStream(name: string, room: string): Promise<void> {
    return this.make('POST', 'enterLiveRoom', { name, room })
  }
}