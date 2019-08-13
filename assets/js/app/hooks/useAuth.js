import {useSelector} from 'react-redux';

import * as AuthStore from '../selectors/auth';
import * as MeStore from '../selectors/me';

const useAuth = () => {
  const isLoggedIn = useSelector(AuthStore.isLoggedIn);
  const account = useSelector(MeStore.getAccount);

  return {isLoggedIn, account};
};

export {useAuth};
