import { AccountApi } from '../../../api/account';
import { LoginModel } from '../model';
import { STORAGE } from '../../../constant/storage'
import { baseService } from '../../common/service/base.service';
import { SET_USER_DATA } from '../redux/actions';

export interface AuthServiceInterface {
  login: (credentials: LoginModel) => Promise<void>;
  logout: () => void;
  getUserData: () => Promise<void>;
  activateAccount: (key: string) => Promise<void>;
  startStreaming: () => Promise<boolean>;
}
const authService = (): AuthServiceInterface => {
  const accountApi = new AccountApi();
  const { dispatch, setLoading } = baseService()

  const login = async (credentials: LoginModel) => {
    try {
      setLoading(SET_USER_DATA, true)
      const { id_token } = await accountApi.login(credentials);
      _authenticateSuccess(id_token);
      if (localStorage.getItem(STORAGE.BN_TOKEN)) {
        await getUserData()
      }
    } catch (e) {
      throw e;
    } finally {
      setLoading(SET_USER_DATA, false)
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE.BN_TOKEN);
  }

  const getUserData = async () => {
    try {
      const userdata = await accountApi.getUser()
      dispatch(SET_USER_DATA, userdata)
    } catch (e) {
      throw e
    }
  }

  const activateAccount = async (key: string) => {
    try {
      await accountApi.activateAccount(key)
    } catch (e) {
      throw e
    }
  }

  const startStreaming = async (): Promise<boolean> => {
    let result: boolean;
    try {
      const tempLoginStr = localStorage.getItem(STORAGE.TEMP_LOGIN);
      const loginData = JSON.parse(tempLoginStr) as LoginModel;
      await login({ ...loginData, rememberMe: true });
      result = true
    } catch (e) {
      result = false
    } finally {
      return result
    }
  }

  const _authenticateSuccess = (token: string) => {
    localStorage.setItem(STORAGE.BN_TOKEN, token);
  }

  return {
    login,
    logout,
    getUserData,
    activateAccount,
    startStreaming
  }


}

export default authService;