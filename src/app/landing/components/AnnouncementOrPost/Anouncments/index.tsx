import { motion } from 'framer-motion';
import { useContext } from 'react';

import bell from '../../../../../assets/icons/bell.svg';
import {
  variantsCardRight,
  wallCardAnimationDuration,
} from '../../CardsGrid/Card/animationSettings';
import AnimationContext, {
  AnimationContextProps,
} from '../../../contexts/animationContext';

const Annoucements = ({ data }) => {
  const animationProps: AnimationContextProps | null =
    useContext(AnimationContext);

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
      className="relative overflow-hidden  rounded-md p-[6%] flex flex-col gap-8 justify-center items-center border-[5px] border-textOrange 
       row-span-2 row-start-1 h-full"
    >
      <img src={bell} alt="icon" className="w-[25%]" />
      <h1 className="text-3xl font-semibold text-textOrange">{data?.title}</h1>
      <div className="text-xl text-center">
        <p className="break-all">{data?.description}</p>
      </div>
    </motion.div>
  );
};

export default Annoucements;
