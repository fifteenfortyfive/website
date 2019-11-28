import {useSelector} from 'react-redux';

import * as AuthStore from '../modules/auth/AuthStore';
import * as MeStore from '../selectors/me';

const useAuth = () => {
  const [isLoggedIn, account] = useSelector((state) => {
    return [AuthStore.isLoggedIn, MeStore.getAccount];
  });

  return {isLoggedIn, account};
};

export {useAuth};
