import {
  mediaTypes,
  socialMediaSources,
} from '../../../../../app/utils/constants';

export const mockMediaData = {
  owner: {
    id: '1',
    username: 'testUser',
    avatar: 'test-avatar-url',
  },
  timestamp: '2023-07-19T12:34:56Z',
  pinned: false,
  text: 'Example text content',
  textContainsOnlyHashtags: false,
  source: socialMediaSources.INSTAGRAM,
  type: mediaTypes.IMAGE,
  url: 'test-media-url',
  visible: true,
  id: '1',
  sourceTypes: [],
  permalink: '',
  thumbnail: '',
  children: [],
  hidden: false,
  clean: true,
};
