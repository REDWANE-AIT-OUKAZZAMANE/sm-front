import {
  createContext,
  useRef,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { useMaxCards } from '../hooks/useMaxCards';
import { Media } from '../../types/index';
import {
  animationDelayRatio,
  wallAnimationDelay,
  wallCardAnimationDuration,
} from '../components/CardsGrid/Card/animationSettings';

export interface AnimationContextProps {
  lastIndexRef: React.RefObject<number>;
  maxCards: number;
  containerRef: React.RefObject<HTMLDivElement>;
  postsList: Media[];
}
interface MyProviderProps {
  children: ReactNode;
  posts: Media[];
}

const AnimationContext = createContext<AnimationContextProps | null>(null);

export const AnimationContextProvider: React.FC<MyProviderProps> = ({
  children,
  posts,
}) => {
  const [maxCards, containerRef] = useMaxCards();
  const lastIndexRef = useRef<number>(0);
  const [postsList, setPostsList] = useState(posts);
  const totalAnimationDuration = useRef(0);
  const postssourceRef = useRef(posts);

  const addToLastIndexRef = () => {
    if (lastIndexRef.current !== null) {
      lastIndexRef.current += maxCards + 1;
    }
  };

  const shiftList = () => {
    if (maxCards !== 0) {
      const postssource = postssourceRef.current;
      if (posts.length - lastIndexRef.current >= maxCards + 1) {
        setPostsList(
          postssource.slice(
            lastIndexRef.current,
            maxCards + lastIndexRef.current
          )
        );
        addToLastIndexRef();
      } else {
        const restCards = maxCards + 1 - (posts.length - lastIndexRef.current);

        setPostsList([
          ...postssource.slice(lastIndexRef.current),
          ...postssource.slice(0, restCards),
        ]);
        lastIndexRef.current = restCards;
      }
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
      setPostsList(postssource.slice(0, maxCards + 1));
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
    if (lastIndexRef.current) {
      lastIndexRef.current = 0;
    }
    postssourceRef.current = posts;
  }, [posts]);

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

export default AnimationContext;
