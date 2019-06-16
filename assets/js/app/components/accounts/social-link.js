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
    <a native href={url} target="_blank" rel="nofollow noopener">
      <span class="tags has-addons">
        <span class={`tag ${service.style}`}>
          <FontAwesomeIcon {...service.iconProps} />
        </span>
        <span class="tag">
          {name}
        </span>
      </span>
    </a>
  );
};

SocialTag.Services = {
  TWITCH: {
    url: 'https://twitch.tv/',
    iconProps: { icon: ['fab', 'twitch'] },
    style: 'is-dark'
  },
  TWITTER: {
    url: 'https://twitter.com/',
    iconProps: { icon: ['fab', 'twitter'] },
    style: 'is-info'
  }
}

export default SocialTag;
