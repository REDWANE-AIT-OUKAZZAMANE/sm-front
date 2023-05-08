import { api, createApplication } from 'react-async-states';

export type Page<T = unknown> = {
  content: T[];
};

export type MediaChild = {
  id: string;
  url: string;
  type: 'VIDEO' | 'IMAGE';
};

export type Media = {
  id: string;
  text?: string;
  type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM';
  source: 'INSTAGRAM' | 'YOUTUBE';
  url: string;
  permalink: string;
  timestamp: string;
  owner?: {
    id: string;
    username: string;
    avatar: string;
  };
  textContainsOnlyHashtags: boolean;
  children?: MediaChild[];
};

export type QueryParams = {};

const appShape = {
  media: {
    search: api<Page<Media>, Error, never, [QueryParams]>(),
  },
};

export const app = createApplication<typeof appShape>(appShape);
