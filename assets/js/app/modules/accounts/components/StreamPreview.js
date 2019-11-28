import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Image
} from 'bloomer';
import Header from '../../../uikit/header';
import Text from '../../../uikit/text';

import {Colors} from '../../../constants';
import style from './StreamPreview.css';

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
    <div class={style.streamPreview} style={{backgroundColor: Colors.TWITCH}}>
      <a
        href={`https://twitch.tv/${username}`}
        target="_blank"
        rel="nofollow noopener"
      >
        <Header
            size={Header.Sizes.H6}
            color={Header.Colors.WHITE}
          >
          NOW STREAMING:
        </Header>

        <Image isRatio="16:9" className={style.image} src={url} />

        <Text
            size={Text.Sizes.SIZE_14}
            color={Text.Colors.WHITE}
            className={style.title}
          >
          {title}
        </Text>
      </a>
    </div>
  );
};

export default StreamPreview;
