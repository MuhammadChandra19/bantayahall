import { AccountApi } from "../../../api/account";
import { baseService } from "../../common/service/base.service"
import { UserMainModel, UserModel } from "../model";
import { SET_USER_DATA } from "../redux/actions";

export const accountService = () => {
  const { dispatch, setLoading, getState } = baseService()
  const accountApi = new AccountApi()

  const getUserData = async () => {
    try {
      setLoading(SET_USER_DATA, true);
      const userdata = await accountApi.getUser()
      dispatch(SET_USER_DATA, userdata)
    } catch (e) {
      throw e
    } finally {
      setLoading(SET_USER_DATA, false);
    }
  }

  const updateUserData = async (account: UserMainModel) => {
    try {
      setLoading(SET_USER_DATA, true);
      await accountApi.updateUserData(account)
      const prevUserData: UserModel = getState().user.user;
      const updated: UserModel = {
        ...prevUserData,
        ...account
      }
      dispatch(SET_USER_DATA, updated)

    } catch (e) {
      throw e
    } finally {
      setLoading(SET_USER_DATA, false);
    }
  }

  return {
    getUserData,
    updateUserData
  }
}
