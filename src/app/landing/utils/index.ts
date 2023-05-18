import { socialMediaSources } from './constants';

const shouldAnimate = (text: string): boolean => {
  if (!text) return false;
  return !text
    .trim()
    .split(' ')
    .every((word) => word.startsWith('#'));
};

export const getSocialMediaType = (caption: string, source: string): string =>
  shouldAnimate(caption) && source !== socialMediaSources.YOUTUBE
    ? 'animated'
    : 'static';
