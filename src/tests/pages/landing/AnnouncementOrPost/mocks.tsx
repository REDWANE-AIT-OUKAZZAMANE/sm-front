import React from 'react';

const mockAnimationProps = {
  lastIndexRef: { current: 0 },
  maxCards: 1,
  containerRef: { current: null },
  postsList: [
    {
      id: 'YT-pxnhN_CntIs',
      text: 'Open Mic - DevoxxMA Day 02',
      type: 'VIDEO',
      source: 'YOUTUBE',
      url: 'https://www.youtube.com/embed/pxnhN_CntIs',
      thumbnail: 'https://i.ytimg.com/vi/pxnhN_CntIs/hqdefault.jpg',
      permalink: 'https://www.youtube.com/watch?v=pxnhN_CntIs',
      children: null,
      timestamp: '2022-12-18T13:20:00Z',
      owner: {
        id: 'UCbJ1L2YRk6_CoVbl3_6tBew',
        username: 'BizTech Morocco',
        avatar: null,
      },
      hidden: false,
      pinned: false,
      sourceTypes: ['devoxxma'],
      clean: false,
      analyzed: true,
      textContainsOnlyHashtags: false,
    },
  ],
};

export const AnimationContext = React.createContext(mockAnimationProps);

const useAnimationContext = vi.fn(() => mockAnimationProps);

export const AnimationContextProvider = ({ children }) => (
  <AnimationContext.Provider value={mockAnimationProps}>
    {children}
  </AnimationContext.Provider>
);
export default useAnimationContext;
