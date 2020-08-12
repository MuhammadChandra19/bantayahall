import registerService, { RegisterServiceInterface } from './registerUser';

interface UserServiceInterface {
  register: RegisterServiceInterface;
}
const userService = (): UserServiceInterface => {
  const register = registerService();

  return {
    register
  }

}
export default userService;