import { h } from 'preact';

import StreamPreview from './StreamPreview';

import { Tag } from 'bloomer';
import SocialLink from '../../../uikit/SocialLink';
import Avatar from '../../../uikit/Avatar';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { simpleDate } from '../../../utils/TimeUtils';
import styles from './AccountCard.mod.css';

const AccountCard = props => {
  const { account, stream, loadingStream } = props;

  const {
    bio,
    avatar_hash: avatarHash,
    username,
    twitch,
    twitter,
    discord_tag: discordTag,
    created_at: createdAt,
    admin,
  } = account;

  return (
    <div className={styles.container}>
      <div class={styles.header}>
        <Avatar className={styles.avatar} src={avatarHash} />

        <div class={styles.textCentered}>
          <Header size={Header.Sizes.H4} className={styles.username}>
            {username}
          </Header>
          {admin && (
            <Tag className={styles.adminTag} isColor="info" isSize="small" isOutlined isUppercase>
              ADMIN
            </Tag>
          )}
        </div>

        {bio && <Text class={styles.bio}>{bio}</Text>}
      </div>

      {stream && <StreamPreview stream={stream} username={twitch} loading={loadingStream} />}

      <div class={styles.content}>
        {twitch && <SocialLink service={SocialLink.Services.TWITCH} name={twitch} key="Twitch" />}

        {twitter && <SocialLink service={SocialLink.Services.TWITTER} name={twitter} key="Twitter" />}

        {discordTag && <SocialLink service={SocialLink.Services.DISCORD} name={discordTag} key="Discord" />}

        {createdAt && <p class={styles.joinedAt}>Joined {simpleDate(createdAt)}</p>}
      </div>
    </div>
  );
};

export default AccountCard;
