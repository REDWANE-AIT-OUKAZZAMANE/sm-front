export default {
  MEDIA: '/v1/media',
  HEADER: '/v1/header',
  FOOTER: '/v1/footer',
  LOGIN: '/v1/auth/login',
  ANNOUNCEMENT:
    '/v1/announcements?page=0&size=1&sort=startDate,asc&endDate.after=',
  TOGGLE_PIN: (mediaId) => `/v1/media/${mediaId}/toggle-pin`,
  LOGOUT: '/v1/auth/logout',
  CURRENT_USER: '/v1/auth/current',
};

export const topics = Object.freeze({
  POSTS: '/media/ws',
  PINNEDPOST: '/media/ws/posts/pinned',
});
