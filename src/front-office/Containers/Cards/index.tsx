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
    <div className="grow grid grid-flow-row grid-cols-3 auto-rows-min gap-y-5 gap-x-10">
      {posts &&
        posts.map(({ id, media_url, ...rest }: CardData) => (
          <Card
            type="animated"
            source="ig"
            avatar=""
            username="Test"
            key={id}
            media={media_url}
            {...rest}
          />
        ))}
    </div>
  );
}
