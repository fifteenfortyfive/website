export const ASSETS_URL = 'https://fifteenfortyfive-assets.nyc3.cdn.digitaloceanspaces.com';

export const CURRENT_EVENT_ID = 20;

export const Colors = {
  TWITCH: '#6441A4',
};

export const Routes = {
  // Public
  HOME: '/',
  ACCOUNT: id => `/accounts/${id}`,
  ACCOUNTS_NEW: '/accounts/new',
  TEAMS: '/teams',
  TEAM: id => `/teams/${id}`,
  STREAMS: '/streams',
  VOLUNTEER: '/volunteer',
  THE_1545: '/1545',
  COMMUNITY_CHEST: '/community-chest',

  // Me
  ME: '/@me',
  ME_CHANGE_PASSWORD: '/@me/change-password',
  ME_EDIT: '/@me/edit',
  ME_PREFERENCES: '/@me/preferences',
  ME_RUN_DASHBOARD: '/@me/run-dashboard',

  // Events
  EVENTS: '/events',
  EVENT: eventId => `/events/${eventId}`,
  EVENT_SUBMIT_RUN: eventId => `/events/${eventId}/submit`,

  // Admin
  ADMIN_BASE: '/admin',
  // AdminV2 is the old admin o.o
  ADMIN_V2: '/admin/v2',

  // Auth
  LOGIN: ({ redirect } = {}) => (redirect ? `/login?redirectRoute=${redirect}` : '/login'),
  LOGOUT: '/logout',
};

export const AdminRoutes = {
  HOME: '/admin',
  EVENT: '/admin/event',
  EVENT_SCHEDULING: ({ eventId }) => `/admin/event/${eventId}/schedule`,
  ACCOUNTS: '/admin/accounts',
};

export const ExternalRoutes = {
  CONTACT_URL: 'mailto:contact@fifteenfortyfive.org',
  VOLUNTEER_URL: 'mailto:volunteer@fifteenfortyfive.org',
  DISCORD_URL: 'http://discord.fifteenfortyfive.org',
  TWITCH_URL: 'https://twitch.tv/mcsn',
  TWITTER_URL: 'https://twitter.com/MCSNSpeedruns',
  SRCOM_URL: 'https://www.speedrun.com/1545',
  YOUTUBE_URL: 'https://www.youtube.com/channel/UCH-_VSTu551p5M4Oz95GIjQ',
  GITHUB_URL: 'https://github.com/fifteenfortyfive',

  // Friends
  RAREWARE_301_URL: 'https://twitch.tv/rareware301',
  CRASH_MARATHON_URL: 'https://www.twitch.tv/crashmarathon',
  SPRASHFECTA_URL:
    'https://docs.google.com/spreadsheets/d/1n1bZ8DV7vhFT0X2fLaXpThEZa9M8aNNyIN1SqR8dr-Q/edit?usp=sharing',
  SPYROTHON_URL: 'https://twitch.tv/spyrothon',
  MARIO_602_URL: 'https://twitch.tv/602Race',

  // Attribution
  GITHUB_FAULTY_URL: 'https://github.com/faultyserver',
};
