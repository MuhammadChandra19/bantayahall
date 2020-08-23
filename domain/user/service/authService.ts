import { AccountApi } from '../../../api/account';
import { LoginModel } from '../model';
import { STORAGE } from '../../../constant/storage'
import { baseService } from '../../common/service/base.service';
import { SET_USER_DATA } from '../redux/actions';

export interface AuthServiceInterface {
  login: (credentials: LoginModel) => Promise<void>;
  logout: () => void
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

  const _authenticateSuccess = (token: string) => {
    localStorage.setItem(STORAGE.BN_TOKEN, token);
  }

  return {
    login,
    logout
  }


}

export default authService;