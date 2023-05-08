import Card from '../../components/Card';
import { Media } from '../../../types';
import { getSocialMediaType } from '../../../utils';

type CardsProps = {
  posts: Media[];
};

export default function Cards({ posts }: CardsProps) {
  return (
    <div className="grow grid grid-cols-autofit overflow-y-hidden grid-rows-2 auto-rows-[0]">
      {posts &&
        posts.map((post: Media) => (
          <Card
            key={post.id}
            media={post}
            type={getSocialMediaType(post.text || '', post.source)}
          />
        ))}
    </div>
  );
}
