import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StreamPreview from './stream-preview';

import {
  Box,
  Tag
} from 'bloomer';
import SocialLink from '../../uikit/social-link';
import Avatar from '../../uikit/avatar';
import Header from '../../uikit/header';
import Text from '../../uikit/text';

import {simpleDate} from '../../util';
import style from './account-card.css';

const AccountCard = (props) => {
  const {
    account,
    stream,
    loading,
    loadingStream,
  } = props;

  const {
    bio,
    avatar_hash,
    username,
    twitch,
    twitter,
    discord_tag,
    created_at,
    admin
  } = account;


  return (
    <Box className={style.container}>
      <div class={style.header}>
        <Avatar className={style.avatar} src={avatar_hash} />

        <div class={style.textCentered}>
          <Header size={Header.Sizes.H4} className={style.username}>
            {username}
          </Header>
          { admin &&
            <Tag
                className={style.adminTag}
                isColor="info"
                isSize="small"
                isOutlined
                isUppercase
              >
              ADMIN
            </Tag>
          }
        </div>

        { bio &&
          <Text class={style.bio}>
            {bio}
          </Text>
        }
      </div>

      { stream &&
        <StreamPreview
          stream={stream}
          username={twitch}
          loading={loadingStream}
        />
      }

      <div class={style.content}>
        { twitch &&
          <SocialLink
            service={SocialLink.Services.TWITCH}
            name={twitch}
            key="Twitch"
          />
        }

        { twitter &&
          <SocialLink
            service={SocialLink.Services.TWITTER}
            name={twitter}
            key="Twitter"
          />
        }

        { discord_tag &&
          <SocialLink
            service={SocialLink.Services.DISCORD}
            name={discord_tag}
            key="Discord"
          />
        }

        { created_at &&
          <p class={style.joinedAt}>
            Joined {simpleDate(created_at)}
          </p>
        }
      </div>
    </Box>
  );
};

export default AccountCard;
