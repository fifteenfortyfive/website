import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Colors} from '../../constants';

const StreamPreview = (props) => {
  const {
    username,
    stream,
    loading,
    expectedWidth=480,
    expectedHeight=854,
  } = props;

  if(loading) return null;

  const {
    title,
    thumbnail_url,
    viewer_count
  } = stream;
  const isLive = stream.type == "live";
  const url = thumbnail_url
      .replace('{width}', expectedWidth)
      .replace('{height}', expectedHeight);

  return (
    <div class="stream-preview" style={{backgroundColor: Colors.TWITCH}}>
      <a
        native
        href={`https://twitch.tv/${username}`}
        target="_blank"
        rel="nofollow noopener"
      >
        <div class="has-padding-left-md has-padding-right-md has-padding-top-sm has-padding-bottom-sm">
          <span class="stream-preview__header">NOW STREAMING:</span>
        </div>
        <figure class="stream-preview__image image is-16by9 is-clipped">
          <img src={url} />
        </figure>

        <div class="stream-preview__title has-padding-left-md has-padding-right-md has-padding-top-sm has-padding-bottom-sm">
          {title}
        </div>
      </a>

    </div>
  );
};

export default StreamPreview;
