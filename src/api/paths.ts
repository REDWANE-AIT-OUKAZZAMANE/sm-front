export default {
  MEDIA: '/v1/media',
  HEADER: '/v1/header',
  FOOTER: '/v1/footer',
  LOGIN: '/v1/auth/login',
  CURRENT_ANNOUNCEMENT: '/v1/announcements/CurrentAnnouncement',
  ANNOUNCEMENT:
    '/v1/announcements?page=0&size=1&sort=startDate,asc&endDate.after=',
  TOGGLE_PIN: (mediaId) => `/v1/media/${mediaId}/toggle-pin`,
  LOGOUT: '/v1/auth/logout',
  CURRENT_USER: '/v1/auth/current',
  MEDIA_VISIBILITY: (mediaId: string) => `/v1/media/${mediaId}/hide-show-media`,
  WALL_SETTINGS: '/v1/wall/settings',
  WALL_SETTINGS_LATEST: '/v1/wall/settings/latest',
  WALL_SETTINGS_UPDATE: (settingsId: string) =>
    `/v1/wall/settings/${settingsId}`,
  ANNOUNCEMENTS_LIST: '/v1/announcements',
  DELETE_ANNOUNCEMENT: (announcementId: string) =>
    `/v1/announcements/${announcementId}`,
  ANNOUNCEMENT_UPDATE: (announcementId: string) =>
    `/v1/announcements/${announcementId}`,
  USERS: '/v1/users',
  DELETE_ADMIN: (adminId: string) => `/v1/users/${adminId}`,
  USER_UPDATE: (userId: string) => `/v1/users/${userId}`,
  AUTHORITIES: '/v1/authorities',
  SIGNUP: '/v1/auth/set-reset-password',
  TOGGLE_ADMIN_STATUS: (adminId: string) =>
    `/v1/users/${adminId}/toggle-status`,
  RESET_PASSWORD: (userEmail: string) =>
    `/v1/users/reset-password/${userEmail}`,
  SEND_EMAIL: '/v1/users/signup',
};

export const topics = Object.freeze({
  POSTS: '/topic/ws/media',
  ANNOUNCEMENTS: '/topic/closest-announcement',
  PINNEDPOST: '/topic/ws/posts/pinned',
  MEDIA_VISIBILITY: '/topic/ws/posts/hidden',
});
