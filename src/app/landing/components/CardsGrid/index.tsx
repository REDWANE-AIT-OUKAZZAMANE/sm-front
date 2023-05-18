import { useContext } from 'react';

import Card from './Card';
import { Media } from '../../types';
import { getSocialMediaType } from '../../utils';
import { getAnimationDelay } from './Card/animationSettings';
import MyContext from '../../contexts/animationContext';

export default function Cards() {
  const animationProps = useContext(MyContext);
  const { containerRef, maxCards, postsList } = animationProps!;

  return (
    <div
      ref={containerRef}
      className="grow grid grid-cols-autofit overflow-y-hidden grid-rows-2 auto-rows-[0] gap-y-[1vw] gap-x-[2vw]"
    >
      {maxCards !== 0 &&
        postsList &&
        postsList.map((post: Media, index: number) => (
          <Card
            key={post.id}
            media={post}
            type={getSocialMediaType(post.text || '', post.source)}
            index={index}
            maxCards={maxCards}
            delay={getAnimationDelay(index, maxCards)}
          />
        ))}
    </div>
  );
}
