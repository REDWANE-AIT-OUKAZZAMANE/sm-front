import Card from "../../components/Card";
import { tempData } from "./tempData";

type CardData = {
  id: number;
  source: string;
  type: string;
  content: string;
  date: string;
  img: string;
  avatar: string;
  username: string;
  mediaType: string;
};

const Cards = () => {
  return (
    <div className="grid grid-flow-row grid-cols-3 content-between gap-y-5 gap-x-10">
      {tempData.map(({ id, img, ...rest }: CardData) => (
        <Card key={id} media={img} {...rest} />
      ))}
    </div>
  );
};

export default Cards;
