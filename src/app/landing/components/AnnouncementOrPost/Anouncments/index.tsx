import { motion } from 'framer-motion';

import bell from '../../../../../assets/icons/bell.svg';
import {
  variantsCardRight,
  wallCardAnimationDuration,
} from '../../CardsGrid/Card/animationSettings';

const Annoucements = ({ data }) => {
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
      className="flex flex-col gap-8 justify-center h-[44vh] items-center border-[5px] border-textOrange aspect-[4.7/6.8] p-[6%]"
    >
      <img src={bell} alt="icon" className="w-[25%]" />
      <h1 className="text-3xl font-semibold text-textOrange">ANNOUNCEMENTS</h1>
      <div className="text-xl text-center">
        <h1 className="font-semibold text-2xl">{data?.title}</h1>
        <p>{data?.description}</p>
      </div>
    </motion.div>
  );
};

export default Annoucements;
