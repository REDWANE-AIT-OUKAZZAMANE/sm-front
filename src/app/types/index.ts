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
  sourceTypes: string[];
  url: string;
  permalink: string;
  timestamp: string;
  owner?: {
    id: string;
    username: string;
    avatar: string;
  };
  textContainsOnlyHashtags: boolean;
  children: MediaChild[];
  pinned: boolean;
  hidden: boolean;
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
export type Announcement = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

export type QueryParams = {};

export type CardProps = {
  media: Media;
  type: string;
  variantIsTall?: boolean;
};
export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
};
