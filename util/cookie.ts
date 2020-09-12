import Cookies from 'universal-cookie';
export const cookieUtil = () => {
  const cookie = new Cookies();

  const setCookie = (key: string, value: string) => cookie.set(key, value, { path: "/" });
  const getCookie = (key: string) => cookie.get(key);
  const deleteCookie = (key: string) => cookie.remove(key, { path: "/" })

  return {
    setCookie,
    getCookie,
    deleteCookie
  }
}