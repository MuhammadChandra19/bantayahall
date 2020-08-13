import registerService, { RegisterServiceInterface } from './registerUser';
import authService, { AuthServiceInterface } from './authService';

interface UserServiceInterface {
  register: RegisterServiceInterface;
  auth: AuthServiceInterface;
}
const userService = (): UserServiceInterface => {
  const register = registerService();
  const auth = authService();

  return {
    register,
    auth
  }

}
export default userService;