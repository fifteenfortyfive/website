import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {simpleDate} from '../../util';

import Avatar from './avatar';
import SocialLink from './social-link';

const AccountCard = (props) => {
  const {
    account
  } = props;

  const {
    avatar_object_id,
    username,
    twitch,
    twitter,
    created_at,
    admin
  } = account;


  return (
    <div class="box is-paddingless">
      <div class="account-header has-padding-md has-padding-top-lg has-background-white-ter">
        <div class="has-text-centered has-margin-bottom-sm">
          <Avatar src={avatar_object_id} />
        </div>

        <div class="has-text-centered">
          <p class="is-size-4 has-text-weight-bold">
            {username}
          </p>
            { admin &&
              <span class="tag is-info is-small is-outlined is-uppercase">
                Admin
              </span>
            }
        </div>
      </div>

      <div class="account-content has-padding-md">
        { twitch &&
          <SocialLink
            service={SocialLink.Services.TWITCH}
            name={twitch}
          />
        }

        { twitter &&
          <SocialLink
            service={SocialLink.Services.TWITTER}
            name={twitter}
          />
        }

        <p>
          Joined {simpleDate(created_at)}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;
