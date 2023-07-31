import React, {
  createContext,
  useRef,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import { Status, useAsyncState } from 'react-async-states';

import { useMaxCards } from '../hooks/useMaxCards';
import { Media } from '../../types/index';
import {
  animationDelayRatio,
  wallAnimationDelay,
  wallCardAnimationDuration,
} from '../components/CardsGrid/Card/animationSettings';
import { hiddenPost } from '../data/sources/HiddenMediaSource';
import defaultSelector from '../../../api/selector';
import { mediaPosts } from '../data/sources/PostsSource';
import { contextPostsSource } from '../data/sources/ContextPostsSource';
import { displayedPostsFetchType } from '../../utils/constants';

export interface AnimationContextProps {
  lastIndexRef: React.RefObject<number>;
  maxCards: number;
  containerRef: React.RefObject<HTMLDivElement>;
  postsList: Media[];
}

interface MyProviderProps {
  children: React.ReactNode;
}

const AnimationContext = createContext<AnimationContextProps | null>(null);

export const AnimationContextProvider: React.FC<MyProviderProps> = ({
  children,
}) => {
  const [maxCards, containerRef] = useMaxCards();
  const lastIndexRef = useRef<number>(0);
  const totalAnimationDuration = useRef(0);

  const [postsList, setPostsList] = useState<Media[]>([]);
  const pinnedPostRef = useRef<Media | null>(null);
  const {
    state: { currentState: postsState },
  } = useAsyncState({
    source: mediaPosts,
    selector: defaultSelector,
  });

  const {
    state: { responseData: postssourceResponse },
    run: getDisplayedPostsSource,
  } = useAsyncState({
    source: contextPostsSource,
    selector: defaultSelector,
  });

  const handelHiddenPostInPostsList = (toggledMedia) => {
    const newpostsList = postsList.map((media) =>
      media.id === toggledMedia.id
        ? {
            ...postssourceResponse.postssource[lastIndexRef.current],
            id: toggledMedia.id,
          }
        : media
    );
    lastIndexRef.current += 1;
    setPostsList(newpostsList);
  };

  useAsyncState(
    {
      source: hiddenPost,
      events: {
        change: [
          {
            status: Status.success,
            handler(result) {
              const toggledMedia = result.state.data as Media;
              getDisplayedPostsSource(
                displayedPostsFetchType.toggleHide,
                toggledMedia
              );
              handelHiddenPostInPostsList(toggledMedia);
            },
          },
        ],
      },
    },
    [postsList]
  );

  const shiftList = () => {
    if (maxCards !== 0) {
      const filtredPostssource = postssourceResponse.postssource.filter(
        (m) => !m.pinned && !m.hidden
      );
      let newPostsList;
      if (filtredPostssource.length - lastIndexRef.current >= maxCards + 1) {
        newPostsList = filtredPostssource.slice(
          lastIndexRef.current,
          maxCards + lastIndexRef.current + 1
        );
        lastIndexRef.current += maxCards + 1;
      } else {
        const restCards =
          maxCards + 1 - (filtredPostssource.length - lastIndexRef.current);
        newPostsList = [
          ...filtredPostssource.slice(lastIndexRef.current),
          ...filtredPostssource.slice(0, restCards),
        ];
        lastIndexRef.current = restCards;
      }
      if (pinnedPostRef.current !== null) {
        newPostsList = [
          pinnedPostRef.current,
          ...newPostsList.slice(0, newPostsList.length - 1),
        ];
        lastIndexRef.current -= 1;
      }
      setPostsList(newPostsList);
    }

    setTimeout(
      shiftList,
      (wallAnimationDelay + totalAnimationDuration.current * 2) * 1000
    );
  };

  const initialisePostList = () => {
    let timeoutId;
    if (maxCards !== 0) {
      lastIndexRef.current = maxCards + 1;
      let newPostsList = postssourceResponse.postssource.slice(0, maxCards + 1);
      if (postssourceResponse.pinnedPost !== null) {
        newPostsList = [
          postssourceResponse.pinnedPost,
          ...newPostsList.slice(0, newPostsList.length - 1),
        ];
        lastIndexRef.current -= 1;
      }
      setPostsList(newPostsList);
      const maximpairecards = maxCards - 1;
      totalAnimationDuration.current =
        maximpairecards * animationDelayRatio + wallCardAnimationDuration;
      timeoutId = setTimeout(() => {
        shiftList();
      }, (wallAnimationDelay + totalAnimationDuration.current * 2) * 1000);
    }
    return timeoutId;
  };

  useEffect(() => {
    const timeoutId = initialisePostList();
    return () => clearTimeout(timeoutId);
  }, [maxCards]);

  useEffect(() => {
    if (postsState.status === Status.success) {
      if (lastIndexRef.current) {
        lastIndexRef.current = 0;
      }
      getDisplayedPostsSource(displayedPostsFetchType.initialFetch, null);
    }
  }, [postsState]);

  useEffect(() => {
    if (postssourceResponse) {
      pinnedPostRef.current = postssourceResponse.pinnedPost;
    }
  }, [postssourceResponse]);

  const contextValue = useMemo(
    () => ({
      lastIndexRef,
      maxCards,
      containerRef,
      postsList,
    }),
    [lastIndexRef, maxCards, containerRef, postsList]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      'useAnimationContext must be used within a AnimationContextProvider'
    );
  }
  return context;
};

export default useAnimationContext;
