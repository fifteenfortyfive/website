import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialTag = (props) => {
  const {
    service, // one of `Services`
    name,
    urlOverride
  } = props;

  const url = urlOverride || `${service.url}/${name}`;

  return (
    <div class="has-margin-sm has-margin-left-md has-margin-right-md">
      <span class="has-margin-right-md">
        <FontAwesomeIcon {...service.iconProps} />
      </span>
      <a native href={url} target="_blank" rel="nofollow noopener">
        {name}
      </a>
    </div>
  );
};

SocialTag.Services = {
  TWITCH: {
    url: 'https://twitch.tv',
    iconProps: { icon: ['fab', 'twitch'] },
    style: 'is-dark'
  },
  TWITTER: {
    url: 'https://twitter.com',
    iconProps: { icon: ['fab', 'twitter'] },
    style: 'is-info'
  }
}

export default SocialTag;
