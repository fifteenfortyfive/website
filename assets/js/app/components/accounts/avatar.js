import {h} from 'preact';

import { ASSETS_URL } from '../../constants';

const Avatar = (props) => {
  const {
    url=ASSETS_URL,
    src,
    size=128, // should be one of 16, 24, 32, 48, 64, 96, 128
  } = props;

  const assetUrl = `${url}/${src}`;

  return (
    <img
      class="avatar"
      width={size}
      height={size}
      src={assetUrl}
    />
  );
}

export default Avatar;
