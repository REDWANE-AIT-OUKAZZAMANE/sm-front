import bell from '../../../../../assets/icons/bell.svg';
import useAnimationContext from '../../../contexts/animationContext';
import { testIds } from '../../../../../tests/constants';

const Annoucements = ({ data }) => {
  const animationProps = useAnimationContext();
  const { maxCards } = animationProps!;
  return (
    <div
      data-testid={testIds.landing.AnnouncementOrPost.announcementContainer}
      style={{
        gridColumnEnd: maxCards / 2 + 2,
      }}
      className="right-card relative row-span-2 row-start-1 flex h-full flex-col items-center justify-center gap-8 overflow-hidden rounded-md 
       border-[5px] border-textOrange p-[6%] opacity-0"
    >
      <img src={bell} alt="icon" className="w-[25%]" />
      <h1 className="text-3xl font-semibold text-textOrange">{data?.title}</h1>
      <div className="text-center text-xl">
        <p className="break-all">{data?.description}</p>
      </div>
    </div>
  );
};

export default Annoucements;
