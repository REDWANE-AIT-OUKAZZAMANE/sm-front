import { socialMediaSources } from './constants';

const shouldAnimate = (text: string): boolean => {
  if (!text) return false;
  return !text
    .trim()
    .split(' ')
    .every((word) => word.startsWith('#'));
};

export const youtubeQueryParams = (media_url: string, id: string): string =>
  `${media_url}?autoplay=1&mute=1&loop=1&playlist=${id}`;

export const getSocialMediaType = (caption: string, source: string): string =>
  shouldAnimate(caption) && source !== socialMediaSources.YOUTUBE
    ? 'animated'
    : 'static';
