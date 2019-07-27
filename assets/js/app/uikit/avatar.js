import {h} from 'preact';

import { ASSETS_URL } from '../constants';
import style from './avatar.css';

const Avatar = (props) => {
  const {
    url=ASSETS_URL,
    src,
    fullSrc = null,
    size=128,
    useDefault=true
  } = props;

  const resolvedSrc = src || (useDefault ? 'default-avatar' : src);
  const assetUrl = fullSrc != null ? fullSrc : `${url}/${resolvedSrc}`;

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
