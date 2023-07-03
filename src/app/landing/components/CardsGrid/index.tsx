import { useContext } from 'react';

import Card from './Card';
import { Media } from '../../../types';
import { getSocialMediaType } from '../../../utils';
import { getAnimationDelay } from './Card/animationSettings';
import MyContext from '../../contexts/animationContext';
import AnnouncementOrPost from '../AnnouncementOrPost';

export default function Cards() {
  const animationProps = useContext(MyContext);
  const { containerRef, maxCards, postsList } = animationProps!;
  return (
    <div
      ref={containerRef}
      className="grid h-[65vh] grow auto-rows-[0] grid-cols-autofit grid-rows-2 gap-x-[2vw] gap-y-[1vw] overflow-hidden"
    >
      {maxCards !== 0 &&
        postsList.length !== 0 &&
        postsList
          .slice(0, postsList.length - 1)
          .map((post: Media, index: number) => (
            <Card
              // eslint-disable-next-line react/no-array-index-key
              key={post.id + index}
              media={post}
              type={getSocialMediaType(post.text || '', post.source)}
              index={index}
              maxCards={maxCards}
              delay={getAnimationDelay(index, maxCards)}
            />
          ))}
      <AnnouncementOrPost />
    </div>
  );
}
