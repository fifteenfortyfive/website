import { useSelector } from 'react-redux';

import * as AuthStore from '../modules/auth/AuthStore';
import * as MeStore from '../modules/me/MeStore';

const useAuth = () => {
  const [isLoggedIn, account, isLoaded] = useSelector(state => {
    return [AuthStore.isLoggedIn(state), MeStore.getAccount(state), AuthStore.isLoaded(state)];
  });

  return { isLoggedIn, account, isLoaded };
};

export { useAuth };
export default useAuth;
