import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StreamPreview from './StreamPreview';

import {
  Box,
  Tag
} from 'bloomer';
import SocialLink from '../../../uikit/social-link';
import Avatar from '../../../uikit/avatar';
import Header from '../../../uikit/header';
import Text from '../../../uikit/text';

import {simpleDate} from '../../../util';
import styles from './AccountCard.css';

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
    <Box className={styles.container}>
      <div class={styles.header}>
        <Avatar className={styles.avatar} src={avatar_hash} />

        <div class={styles.textCentered}>
          <Header size={Header.Sizes.H4} className={styles.username}>
            {username}
          </Header>
          { admin &&
            <Tag
                className={styles.adminTag}
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
          <Text class={styles.bio}>
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

      <div class={styles.content}>
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
          <p class={styles.joinedAt}>
            Joined {simpleDate(created_at)}
          </p>
        }
      </div>
    </Box>
  );
};

export default AccountCard;
