import { h } from 'preact';

import Avatar from '../../../uikit/Avatar';
import getThumbnailURL from '../getThumbnailURL';

import { Routes } from '../../../Constants';

const StreamCard = props => {
  const { account, stream } = props;

  const twitchPath = account ? account.twitch : stream.user_id;

  return (
    <div class="ff-card">
      <div class="ff-card__image-header">
        <a native href={`https://twitch.tv/${twitchPath}`} target="_blank" rel="noopener noreferrer">
          <figure class="image is-16-by-9">
            <img src={getThumbnailURL(stream.thumbnail_url, 320, 180)} />
          </figure>
        </a>
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
                <a href={Routes.ACCOUNT(account.id)}>{account.username}</a>
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
