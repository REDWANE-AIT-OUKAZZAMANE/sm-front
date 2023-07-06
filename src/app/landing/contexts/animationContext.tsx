import {
  createContext,
  useRef,
  ReactNode,
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
import { pinedPost } from '../data/sources/PinnedPostSource';
import { mediaPosts } from '../data/sources/PostsSource';
import { hiddenPost } from '../data/sources/HiddenMediaSource';

export interface AnimationContextProps {
  lastIndexRef: React.RefObject<number>;
  maxCards: number;
  containerRef: React.RefObject<HTMLDivElement>;
  postsList: Media[];
}
interface MyProviderProps {
  children: ReactNode;
}

const AnimationContext = createContext<AnimationContextProps | null>(null);

export const AnimationContextProvider: React.FC<MyProviderProps> = ({
  children,
}) => {
  const { state: pinnedPostState } = useAsyncState(pinedPost);
  const { state: postsState } = useAsyncState(mediaPosts);
  const posts = postsState.data as Media[];
  const [maxCards, containerRef] = useMaxCards();
  const lastIndexRef = useRef<number>(0);
  const [postsList, setPostsList] = useState<Media[]>([]);
  const totalAnimationDuration = useRef(0);
  const postssourceRef = useRef(posts);
  const pinnedPostRef = useRef<Media | null>(null);
  const { state: hiddenPostState } = useAsyncState(hiddenPost);

  const addToLastIndexRef = () => {
    if (lastIndexRef.current !== null) {
      lastIndexRef.current += maxCards + 1;
    }
  };
  const shiftList = () => {
    if (maxCards !== 0) {
      const postssource = postssourceRef.current.filter(
        (m) => !m.pinned && !m.hidden
      );
      let newPostsList;
      if (postssource.length - lastIndexRef.current >= maxCards + 1) {
        newPostsList = postssource.slice(
          lastIndexRef.current,
          maxCards + lastIndexRef.current + 1
        );

        addToLastIndexRef();
      } else {
        const restCards =
          maxCards + 1 - (postssource.length - lastIndexRef.current);
        newPostsList = [
          ...postssource.slice(lastIndexRef.current),
          ...postssource.slice(0, restCards),
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
  useEffect(() => {
    let timeoutId;
    if (maxCards !== 0) {
      const postssource = postssourceRef.current;
      lastIndexRef.current = maxCards + 1;
      let newPostsList = postssource.slice(0, maxCards + 1);
      if (pinnedPostRef.current !== null) {
        newPostsList = [
          pinnedPostRef.current,
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
    return () => {
      clearTimeout(timeoutId);
    };
  }, [maxCards]);

  useEffect(() => {
    if (pinnedPostState.status === Status.success) {
      const toggledMedia = pinnedPostState.data;
      if (toggledMedia) {
        if (toggledMedia.pinned) {
          postssourceRef.current = posts.map((media) => ({
            ...media,
            pinned: false,
          }));
          postssourceRef.current = posts.filter(
            (media) => media.id !== toggledMedia.id
          );
          pinnedPostRef.current = toggledMedia;
        } else {
          pinnedPostRef.current = null;
          postssourceRef.current = posts.map((media) => ({
            ...media,
            pinned: false,
          }));
        }
      }
    }
  }, [pinnedPostState, posts]);

  useEffect(() => {
    if (hiddenPostState.status === Status.success) {
      const toggledMedia = hiddenPostState.data;
      if (toggledMedia) {
        if (toggledMedia.hidden) {
          // Hide the post
          if (
            pinnedPostRef.current &&
            toggledMedia.id === pinnedPostRef.current.id
          ) {
            pinnedPostRef.current = null;
          }
        }
        postssourceRef.current = posts.map((media) => {
          if (media.id === toggledMedia.id)
            return { ...media, hidden: toggledMedia.hidden };
          return media;
        });
        if (postsList.some((m) => m.id === toggledMedia.id)) {
          const newpostsList = postsList.map((media) => {
            if (media.id === toggledMedia.id) {
              return {
                ...postssourceRef.current[lastIndexRef.current],
                id: toggledMedia.id,
              };
            }
            return media;
          });
          lastIndexRef.current += 1;
          setPostsList(newpostsList);
        }
      }
    }
  }, [hiddenPostState, posts]);

  useEffect(() => {
    if (postsState.status === Status.success) {
      if (lastIndexRef.current) {
        lastIndexRef.current = 0;
      }
      if (posts != null) {
        const pinnedMedia = posts.find((post) => post.pinned);
        if (pinnedMedia) {
          pinnedPostRef.current = pinnedMedia;
        } else {
          pinnedPostRef.current = null;
        }
        postssourceRef.current = posts.filter((media) => !media.pinned);
      }
    }
  }, [postsState]);

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
