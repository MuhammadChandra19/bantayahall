import { BaseApi } from "../base.api";
import { AppConfig } from "../../constant/app";
import { UserModel, UserMainModel } from "../../domain/user/model";

export class AccountApi extends BaseApi {
  constructor() {
    super(AppConfig.API_URL)
  }

  public async updateUserData(account: UserMainModel): Promise<void> {
    const data = {
      ...account,
      login: account.username
    }
    delete data.username
    return this.make('POST', 'api/account', data)
  }

  public async getUser(): Promise<UserModel> {
    return this.make('GET', '/api/account')
      .then((res: any) => {
        const login = res.login;
        delete res.login
        let userData: UserModel = {
          ...res,
          username: login,
        }
        return userData
      })
  }

}