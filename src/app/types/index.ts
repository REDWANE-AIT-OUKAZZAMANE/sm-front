export type MediaChild = {
  id: string;
  url: string;
  type: 'VIDEO' | 'IMAGE';
};

export type Media = {
  visible: any;
  id: string;
  text?: string;
  type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM';
  source: 'INSTAGRAM' | 'YOUTUBE';
  sourceTypes: string[];
  url: string;
  permalink: string;
  thumbnail: string;
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
  clean: boolean;
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
  deleted?: boolean;
};

export type QueryParams = {};

export type CardProps = {
  media: Media;
  type: string;
  variantIsTall?: boolean;
};
export type Role = {
  id: string;
  name: string;
};
export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  authorities: Role[];
  activated: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
};

export type Page<T = unknown> = {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type WallSettings = {
  id: string;
  title: string;
  logoBase64: string;
  filename: string;
};

// export type Authority = {
//   id: string;
//   name: string;
// };

// export type User = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   activated?: boolean;
//   createdAt?: Date;
//   lastModifiedAt?: Date;
//   authorities?: Authority[];
// };
