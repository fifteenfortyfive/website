import {h} from 'preact';
import {useSelector} from 'react-redux';
import classNames from 'classnames';

import * as AdminAccountsStore from '../selectors';

import Avatar from '../../../../uikit/Avatar';
import Header from '../../../../uikit/Header';
import Text from '../../../../uikit/Text';

import style from './account.css';

const Account = (props) => {
  const {
    accountId,
    className
  } = props;

  const account = useSelector((state) => {
    return AdminAccountsStore.getAccount(state, accountId);
  });

  if(account == null) return null;

  return (
    <div class={classNames(style.container, className)}>
      <Avatar className={style.avatar} src={account.avatar_hash} size={48} />
      <div>
        <Header size={Header.Sizes.H5}>{account.username}</Header>
        <Text color={Text.Colors.MUTED} marginless>{account.discord_tag}</Text>
      </div>
    </div>
  );
};

export default Account;
