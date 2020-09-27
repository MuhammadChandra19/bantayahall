import { UserModel } from "../../model";

export interface UserState {
  user: UserModel,
  isUserDatacomplete: boolean
}