import IGIcon from '../assets/icons/ig.svg';
import TwitterIcon from '../assets/icons/twitter.svg';
import IGColor from '../assets/icons/ig-color.svg';
import TwitterColor from '../assets/icons/tw-color.svg';

export const contentTypes = Object.freeze({
  STATIC: 'static',
  ANIMATED: 'animated',
});

export const mediaTypes = Object.freeze({
  IMAGE: 'image',
  VIDEO: 'video',
});

export const socialMediaSources = Object.freeze({
  TWITTER: 'twitter',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'facebook',
  YOUTUBE: 'YOUTUBE',
});

export const topics = Object.freeze({
  POSTS: '/media/ws',
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
  },
});
