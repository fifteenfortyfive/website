import { h } from 'preact';

import Avatar from '../../../uikit/Avatar';
import getThumbnailURL from '../getThumbnailURL';

import { Routes } from '../../../Constants';

const StreamGrid = props => {
  const { account, stream } = props;

  return (
    <div class="stream-card">
      <figure class="image is-16-by-9">
        <img src={getThumbnailURL(stream.thumbnail_url, 320, 180)} />
      </figure>

      {account && (
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
      )}
    </div>
  );
};

export default StreamGrid;
