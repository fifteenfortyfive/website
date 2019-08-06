export const ASSETS_URL = "https://fifteenfortyfive-assets.nyc3.cdn.digitaloceanspaces.com";


export const Colors = {
  TWITCH: '#6441A4'
};


export const Routes = {
  HOME: '/',
  ME: '/@me',
  ME_EDIT: '/@me/edit',
  ME_PREFERENCES: '/@me/preferences',
  ME_RUN_DASHBOARD: '/@me/run-dashboard',
  ACCOUNT: (id) => `/accounts/${id}`,
  ACCOUNTS_NEW: '/accounts/new',
  TEAMS: 'teams',
  TEAM: (id) => `/teams/${id}`,
  EVENTS: 'events',
  EVENT: (id) => `/events/${id}`,
  STREAMS: '/streams',
  VOLUNTEER: '/volunteer',

  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_EVENTS: '/admin/events',

  // Auth
  LOGIN: 'login',
  LOGOUT: 'logout',
};


export const ExternalRoutes = {
  CONTACT_URL: 'mailto:contact@fifteenfortyfive.org',
  VOLUNTEER_URL: 'mailto:volunteer@fifteenfortyfive.org',
  DISCORD_URL: 'http://discord.fifteenfortyfive.org',
  TWITCH_URL: 'https://twitch.tv/The1545',
  TWITTER_URL: 'https://twitter.com/The_1545',
  SRCOM_URL: 'https://www.speedrun.com/1545',
  YOUTUBE_URL: 'https://www.youtube.com/channel/UCH-_VSTu551p5M4Oz95GIjQ',
};
