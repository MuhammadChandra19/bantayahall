import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { UserBaseModel, UserRegister, LoginModel, UserModel } from "../../domain/user/model";
import { JwtToken } from "../../util/types";

export class AccountApi extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async registerAccount(data: UserRegister): Promise<any> {
    return this.make('POST', 'api/register', this.selectorRegister(data));
  }

  public async login(credentials: LoginModel): Promise<JwtToken> {
    return this.make('POST', 'api/authenticate', credentials);
  }

  public async getUser(): Promise<UserModel> {
    return this.make('GET', '/api/account')
      .then((res: any) => {
        const login = res.login;
        delete res.login
        let userData: UserModel = {
          ...res,
          username: login
        }
        return userData
      })
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