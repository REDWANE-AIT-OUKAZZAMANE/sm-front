import Card from '../../components/Card';

type CardData = {
  id: string;
  caption: string;
  timestamp: string;
  media_url: string;
  media_type: string;
  permalink: string;
};

type CardsProps = {
  posts: CardData[];
};

export default function Cards({ posts }: CardsProps) {
  return (
    <div className="grow grid grid-cols-autofit overflow-y-hidden grid-rows-2 auto-rows-[0] gap-y-8 gap-x-2">
      {posts &&
        posts.map((post: CardData) => (
          <Card
            type={`${post.caption ? 'animated' : 'static'}`}
            username="Username"
            key={post.id}
            {...post}
          />
        ))}
    </div>
  );
}
