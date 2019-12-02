import { h } from 'preact';

import Anchor from '../../../uikit/Anchor';
import Avatar from '../../../uikit/Avatar';
import getThumbnailURL from '../getThumbnailURL';

import { Routes } from '../../../Constants';

const StreamCard = props => {
  const { account, stream } = props;

  const twitchPath = account ? account.twitch : stream.user_id;

  return (
    <div class="ff-card">
      <div class="ff-card__image-header">
        <Anchor href={`https://twitch.tv/${twitchPath}`}>
          <figure class="image is-16-by-9">
            <img src={getThumbnailURL(stream.thumbnail_url, 320, 180)} />
          </figure>
        </Anchor>
      </div>

      <div class="ff-card__content">
        {account ? (
          <div class="is-flex">
            <div style={{ flex: '0 0 48px' }}>
              <Avatar src={account.avatar_hash} size={48} />
            </div>
            <div>
              <p class="has-text-weight-bold">{stream.title}</p>
              <p>
                <Anchor href={Routes.ACCOUNT(account.id)}>{account.username}</Anchor>
              </p>
            </div>
          </div>
        ) : (
          <div class="placeholder" />
        )}
      </div>
    </div>
  );
};

export default StreamCard;
