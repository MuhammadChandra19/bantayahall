import { AppConfig } from "../../constant/app";
import { LoginModel, UserRegister } from "../../domain/user/model";
import { JwtToken } from "../../util/types";
import { BaseApi } from "../base.api";

export class AuthApi extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async registerAccount(data: UserRegister): Promise<any> {
    return this.make('POST', 'api/register', this.selectorRegister(data));
  }

  public async login(credentials: LoginModel): Promise<JwtToken> {
    return this.make('POST', 'api/authenticate', credentials);
  }

  public async activateAccount(key: string): Promise<void> {
    return this.make('GET', 'api/activate', { key })
  }

  private selectorRegister(data: UserRegister) {
    let selectedData: any = {}
    selectedData = {
      ...data,
      login: data.username,
      langKey: 'en'
    }
    delete selectedData.username


    return selectedData
  }
}