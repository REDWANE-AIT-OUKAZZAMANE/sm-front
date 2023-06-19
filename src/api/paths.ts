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
};

export const topics = Object.freeze({
  POSTS: '/media/ws',
  ANNOUNCEMENTS: '/announcements/ws',
  PINNEDPOST: '/media/ws/posts/pinned',
  MEDIA_VISIBILITY: '/media/ws/posts/hidden',
});
