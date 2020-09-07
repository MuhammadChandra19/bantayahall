import { AccountApi } from '../../../api/account';
import { UserRegister } from '../model';
import { STORAGE } from '../../../constant/storage';
export interface RegisterServiceInterface {
  registerNewUser: (form: UserRegister) => Promise<void>
}

const registerService = (): RegisterServiceInterface => {
  const accoutApi = new AccountApi();

  const registerNewUser = async (form: UserRegister) => {
    try {
      await accoutApi.registerAccount(form);
      localStorage.setItem(STORAGE.TEMP_LOGIN, JSON.stringify(form))
    } catch (e) {
      throw e;
    }
  }

  return {
    registerNewUser
  }



}
export default registerService;