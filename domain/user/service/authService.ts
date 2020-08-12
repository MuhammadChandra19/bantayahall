import { AccountApi } from '../../../api/account';
import { LoginModel } from '../model';
import { STORAGE } from '../../../constant/storage'

export interface AuthServiceInterface {
  login: (credentials: LoginModel) => Promise<void>;
  logout: () => void
}
const authService = (): AuthServiceInterface => {
  const accountApi = new AccountApi();

  const login = async (credentials: LoginModel) => {
    try {
      const { id_token } = await accountApi.login(credentials);
      _authenticateSuccess(id_token);

    } catch (e) {
      throw e;
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE.BN_TOKEN);
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