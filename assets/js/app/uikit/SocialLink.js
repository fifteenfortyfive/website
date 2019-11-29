import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './SocialLink.css';

const SocialTag = props => {
  const {
    service, // one of `Services`
    name,
    urlOverride,
  } = props;

  const url = urlOverride || (service.url ? `${service.url}/${name}` : null);

  return (
    <div class={style.container}>
      <span class={style.icon}>
        <FontAwesomeIcon {...service.iconProps} />
      </span>
      {url ? (
        <a native href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
};

SocialTag.Services = {
  TWITCH: {
    name: 'Twitch',
    url: 'https://twitch.tv',
    iconProps: { icon: ['fab', 'twitch'] },
    style: 'is-dark',
  },
  TWITTER: {
    name: 'Twitter',
    url: 'https://twitter.com',
    iconProps: { icon: ['fab', 'twitter'] },
    style: 'is-info',
  },
  DISCORD: {
    name: 'Discord',
    url: null,
    iconProps: { icon: ['fab', 'discord'] },
    style: 'is-info',
  },
};

export default SocialTag;
