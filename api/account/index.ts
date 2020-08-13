import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { UserBaseModel, UserRegister, LoginModel } from "../../domain/user/model";
import { JwtToken } from "../../util/types";

export class AccountApi extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async registerAccount(data: UserRegister): Promise<any> {
    console.log(process.env.API_URL)
    return this.make('POST', 'api/register', this.selectorRegister(data));
  }

  public async login(credentials: LoginModel): Promise<JwtToken> {
    return this.make('POST', 'api/authenticate', credentials);
  }

  private selectorRegister(data: UserRegister) {
    let selectedData: any = {}
    selectedData = {
      ...data,
      login: data.username
    }
    delete selectedData.username


    return selectedData
  }
}