import IGIcon from '../../assets/icons/ig.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import YoutubeIcon from '../../assets/icons/yt-white.svg';
import IGColor from '../../assets/icons/ig-color.svg';
import TwitterColor from '../../assets/icons/tw-color.svg';
import IGWhite from '../../assets/icons/ig-white.svg';
import YoutubeColor from '../../assets/icons/yt-color.svg';

export const contentTypes = Object.freeze({
  STATIC: 'static',
  ANIMATED: 'animated',
});

export const mediaTypes = Object.freeze({
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  CAROUSEL_ALBUM: 'CAROUSEL_ALBUM',
});

export const socialMediaSources = Object.freeze({
  TWITTER: 'twitter',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'facebook',
  YOUTUBE: 'YOUTUBE',
});

export const API_URL = '/ws';

export const socialMediaIcons = Object.freeze({
  TWITTER: {
    color: TwitterColor,
    default: TwitterIcon,
  },
  INSTAGRAM: {
    color: IGColor,
    default: IGIcon,
    colorHeader: IGWhite,
  },
  YOUTUBE: {
    color: YoutubeColor,
    default: YoutubeIcon,
    colorHeader: YoutubeIcon,
  },
});

export const highlightSymbols = Object.freeze({
  HASHTAG: '#',
  MENTION: '@',
});

export const sponsors = Object.freeze({
  Diamond: 'Diamond',
  Platinum: 'Platinum',
});

export const defaultPostsQueryParams = {
  page: 0,
  size: 15,
  sort: 'timestamp,desc',
  q: '',
  'hidden.eq': undefined,
  'source.eq': undefined,
};
export const defaultAdminsQueryParams = {
  sort: 'createdAt,desc',
};

export const postTextCharacter = {
  limit: 210,
};

export const displayedPostsFetchType = Object.freeze({
  initialFetch: 'initialFetch',
  togglePin: 'togglePin',
  toggleHide: 'toggleHide',
});

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  MODERATOR: 'ROLE_MODERATOR',
};
