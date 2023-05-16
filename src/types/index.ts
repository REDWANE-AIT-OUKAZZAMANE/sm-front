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

export type HeaderData = {
  id: string;
  logoUrl: string;
  title: string;
};

export type FooterData = {
  logoUrl: string;
  coOrganizer: string;
  institutionalPartners: string[];
  sponsors: {
    type: string;
    logoUrl: string;
  }[];
};
export type QueryParams = {};
