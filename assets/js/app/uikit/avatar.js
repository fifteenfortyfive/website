import {h} from 'preact';

import { ASSETS_URL } from '../constants';
import style from './avatar.css';

const Avatar = (props) => {
  const {
    url=ASSETS_URL,
    src,
    fullSrc = null,
    size=128, // should be one of 16, 24, 32, 48, 64, 96, 128
  } = props;

  const assetUrl = fullSrc != null ? fullSrc : `${url}/${src}`;

  return (
    <img
      class={style.avatar}
      width={size}
      height={size}
      src={assetUrl}
    />
  );
}

export default Avatar;
