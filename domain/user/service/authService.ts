import { AccountApi } from '../../../api/account';
import { LoginModel, UserRegister } from '../model';
import { STORAGE } from '../../../constant/storage'
import { baseService } from '../../common/service/base.service';
import { SET_USER_DATA } from '../redux/actions';
import { cookieUtil } from '../../../util/cookie';
import { AuthApi } from '../../../api/auth';
import { accountService } from './accountService';

export interface AuthServiceInterface {
  login: (credentials: LoginModel) => Promise<void>;
  logout: () => void;
  activateAccount: (key: string) => Promise<void>;
  startStreaming: () => Promise<boolean>;
  registerNewUser: (form: UserRegister) => Promise<void>;
}
const authService = (): AuthServiceInterface => {
  const { getUserData } = accountService()
  const authApi = new AuthApi();
  const { dispatch, setLoading } = baseService()
  const { setCookie, deleteCookie } = cookieUtil();

  const login = async (credentials: LoginModel) => {
    try {
      setLoading(SET_USER_DATA, true)
      const { id_token } = await authApi.login(credentials);
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
    deleteCookie(STORAGE.BN_TOKEN);
    localStorage.removeItem(STORAGE.BN_TOKEN);

  }

  const registerNewUser = async (form: UserRegister) => {
    try {
      await authApi.registerAccount(form);
      localStorage.setItem(STORAGE.TEMP_LOGIN, JSON.stringify(form))
    } catch (e) {
      throw e;
    }
  }


  const activateAccount = async (key: string) => {
    try {
      await authApi.activateAccount(key)
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
    setCookie(STORAGE.BN_TOKEN, token);
  }

  return {
    login,
    logout,
    activateAccount,
    startStreaming,
    registerNewUser
  }


}

export default authService;