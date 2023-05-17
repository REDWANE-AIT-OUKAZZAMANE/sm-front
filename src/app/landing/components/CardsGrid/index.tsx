import Card from './Card';
import { Media } from '../../types';
import { getSocialMediaType } from '../../utils';
import { useMaxCards } from '../../hooks/useMaxCards';

type CardsProps = {
  posts: Media[];
};

export default function Cards({ posts }: CardsProps) {
  const [maxCards, containerRef] = useMaxCards();

  return (
    <div
      ref={containerRef}
      className="grow grid grid-cols-autofit overflow-y-hidden grid-rows-2 auto-rows-[0] gap-y-[1vw] gap-x-[2vw]"
    >
      {posts &&
        posts
          .slice(0, maxCards)
          .map((post: Media) => (
            <Card
              key={post.id}
              media={post}
              type={getSocialMediaType(post.text || '', post.source)}
            />
          ))}
    </div>
  );
}
