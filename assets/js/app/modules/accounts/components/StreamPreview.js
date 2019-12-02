import { h } from 'preact';

import { Image } from 'bloomer';
import Header from '../../../uikit/Header';
import Anchor from '../../../uikit/Anchor';
import Text from '../../../uikit/Text';

import { Colors } from '../../../Constants';
import style from './StreamPreview.css';

const StreamPreview = props => {
  const { username, stream, loading, expectedWidth = 480, expectedHeight = 854 } = props;

  if (loading) return null;

  const { title, thumbnail_url: thumbnailUrl } = stream;
  const url = thumbnailUrl.replace('{width}', expectedWidth).replace('{height}', expectedHeight);

  return (
    <div class={style.streamPreview} style={{ backgroundColor: Colors.TWITCH }}>
      <Anchor href={`https://twitch.tv/${username}`}>
        <Header size={Header.Sizes.H6} color={Header.Colors.WHITE}>
          NOW STREAMING:
        </Header>

        <Image isRatio="16:9" className={style.image} src={url} />

        <Text size={Text.Sizes.SIZE_14} color={Text.Colors.WHITE} className={style.title}>
          {title}
        </Text>
      </Anchor>
    </div>
  );
};

export default StreamPreview;
