
import authService, { AuthServiceInterface } from './authService';

interface UserServiceInterface {
  auth: AuthServiceInterface;
}
const userService = (): UserServiceInterface => {
  const auth = authService();

  return {
    auth
  }

}
export default userService;