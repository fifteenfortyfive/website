import { useSelector } from 'react-redux';

import * as AuthStore from '../modules/auth/AuthStore';
import * as MeStore from '../modules/me/MeStore';

const useAuth = () => {
  const [isLoggedIn, account] = useSelector(state => {
    return [AuthStore.isLoggedIn(state), MeStore.getAccount(state)];
  });

  return { isLoggedIn, account };
};

export { useAuth };
export default useAuth;
