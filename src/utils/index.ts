import { socialMediaSources } from './constants';

export const youtubeQueryParams = (media_url: string, id: string): string =>
  `${media_url}?autoplay=1&mute=1&loop=1&playlist=${id}`;

export const getSocialMediaType = (caption: string, source: string): string =>
  caption && source !== socialMediaSources.YOUTUBE ? 'animated' : 'static';
