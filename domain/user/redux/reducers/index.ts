import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { UserState } from "../states";
import { Dict } from "../../../../util/types";
import { UserModel } from "../../model";
import { SET_IS_USER_DATA_COMPLETE, SET_USER_DATA } from "../actions";

export class UserReducer extends Reducer<UserState> {
  constructor() {
    super({
      user: {},
      isUserDatacomplete: false
    })
  }

  public setUserData(state: UserState, user: UserModel): UserState {
    return {
      ...state,
      user
    }
  }

  public setIsUserDataComplete(state: UserState, isUserDatacomplete: boolean): UserState {
    return {
      ...state,
      isUserDatacomplete
    }
  }

  public get actions(): Dict<SingleReducer<UserState>> {
    return {
      [SET_USER_DATA]: this.setUserData,
      [SET_IS_USER_DATA_COMPLETE]: this.setIsUserDataComplete
    }
  }
}