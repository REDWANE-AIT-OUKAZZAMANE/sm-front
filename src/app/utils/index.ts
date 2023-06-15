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

export const removeUndefinedValues = (obj) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

export const postTextLimiter = (text: string | undefined, limit: number) => {
  if (text && text.length > limit) {
    return `${text.slice(0, limit)} ...`;
  }
  return text || '';
};
