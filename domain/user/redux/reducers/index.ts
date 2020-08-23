import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { UserState } from "../states";
import { Dict } from "../../../../util/types";
import { UserModel } from "../../model";
import { SET_USER_DATA } from "../actions";

export class UserReducer extends Reducer<UserState> {
  constructor() {
    super({
      user: {}
    })
  }

  public setUserData(state: UserState, user: UserModel) {
    return {
      ...state,
      user
    }
  }

  public get actions(): Dict<SingleReducer<UserState>> {
    return {
      [SET_USER_DATA]: this.setUserData
    }
  }
}