import {h} from 'preact';

import StreamCard from './stream-card';

const StreamGrid = (props) => {
  const {
    account,
    stream,
    loadingAccount,
    loadingStream,
  } = props;

  return (
    <div class="stream-card">
      <figure class="image is-16-by-9">
        <img src={getThumbnailURL(stream.thumbnail_url, 320, 180)} />
      </figure>

      { account &&
        <div class="is-flex has-padding-top-sm">
          <div class="has-margin-right-sm" style={{flex: "0 0 48px"}}>
            <Avatar src={account.avatar_object_id} size={48} />
          </div>
          <div>
            <p class="has-text-weight-bold">{stream.title}</p>
            <p><a href={Routes.ACCOUNT(account.id)}>{account.username}</a></p>
          </div>
        </div>
      }
    </div>
  );
}

export default StreamGrid;
