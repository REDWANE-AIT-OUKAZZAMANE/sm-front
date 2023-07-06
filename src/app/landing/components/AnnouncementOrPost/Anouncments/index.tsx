import { motion } from 'framer-motion';

import bell from '../../../../../assets/icons/bell.svg';
import {
  variantsCardRight,
  wallCardAnimationDuration,
} from '../../CardsGrid/Card/animationSettings';
import useAnimationContext from '../../../contexts/animationContext';

const Annoucements = ({ data }) => {
  const animationProps = useAnimationContext();

  const { maxCards } = animationProps!;
  const transitionCard = {
    duration: wallCardAnimationDuration,
    delay: 0,
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variantsCardRight}
      transition={transitionCard}
      exit="exit"
      style={{
        gridColumnEnd: maxCards / 2 + 2,
      }}
      className="relative row-span-2  row-start-1 flex h-full flex-col items-center justify-center gap-8 overflow-hidden rounded-md 
       border-[5px] border-textOrange p-[6%]"
    >
      <img src={bell} alt="icon" className="w-[25%]" />
      <h1 className="text-3xl font-semibold text-textOrange">{data?.title}</h1>
      <div className="text-center text-xl">
        <p className="break-all">{data?.description}</p>
      </div>
    </motion.div>
  );
};

export default Annoucements;
