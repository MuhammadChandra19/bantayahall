import { message, notification } from "antd";
import { AccountApi } from "../../../api/account";
import { baseService } from "../../common/service/base.service"
import { UserMainModel, UserModel } from "../model";
import { SET_IS_USER_DATA_COMPLETE, SET_USER_DATA } from "../redux/actions";

export interface AccountServiceInterface {
  getUserData: () => Promise<UserModel>;
  updateUserData: (account: UserMainModel) => Promise<void>;
}
const accountService = (): AccountServiceInterface => {
  const { dispatch, setLoading, getState } = baseService()
  const accountApi = new AccountApi()

  const getUserData = async () => {
    try {
      setLoading(SET_USER_DATA, true);
      const userdata = await accountApi.getUser()
      dispatch(SET_USER_DATA, userdata)
      _setCompletionUserData(userdata)
      return userdata
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
      _setCompletionUserData(account)

      message.success('success update personal information')

    } catch (e) {
      throw e
    } finally {
      setLoading(SET_USER_DATA, false);
    }
  }

  const _setCompletionUserData = (account: UserMainModel) => {
    const isComplete = !!account.address || !!account.firstName || !!account.lastName || !!account.phone
    dispatch(SET_IS_USER_DATA_COMPLETE, isComplete)
  }

  return {
    getUserData,
    updateUserData
  }
}

export default accountService
