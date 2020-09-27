
import accountService, { AccountServiceInterface } from './accountService';
import authService, { AuthServiceInterface } from './authService';

interface UserServiceInterface {
  auth: AuthServiceInterface;
  account: AccountServiceInterface;
}
const userService = (): UserServiceInterface => {
  const auth = authService();
  const account = accountService();

  return {
    auth,
    account,
  }

}
export default userService;