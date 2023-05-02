import { motion } from 'framer-motion';
import classNames from 'classnames';
import dayjs from 'dayjs';

import VideoIcon from '../../../assets/icons/video.svg';
import {
  contentTypes,
  mediaTypes,
  socialMediaIcons,
} from '../../../utils/constants';

type CardProps = {
  type: string;
  media_type: string;
  source?: string;
  caption: string;
  timestamp: string;
  media_url: string;
  avatar?: string;
  username: string;
  variantIsTall?: boolean;
};

const textAnimation = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};
const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
const BackgroundImageAnimation = {
  initial: { scale: 1, opacity: 1, zIndex: 18 },
  animate: { scale: 1.5, opacity: 0.2, zIndex: 2 },
};

const transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatDelay: 30,
};

const TextCard = ({
  type,
  source,
  caption,
  timestamp,
  media_url,
  avatar,
  username,
  variantIsTall,
  media_type,
}: CardProps) => (
  <div
    className={classNames(
      'relative overflow-hidden bg-gray-200/20 rounded-md px-[24px] flex flex-col gap-8 justify-center',
      {
        'aspect-[4.7/6.8] min-h-[37vh]': variantIsTall,
        'max-h-[36vh] aspect-[4.7/5]': !variantIsTall,
      }
    )}
  >
    {type === contentTypes.ANIMATED ? (
      <>
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ ...transition, repeatType: 'reverse' }}
          variants={textAnimation}
          className="flex items-center z-10"
        >
          <div className="w-[15%] min-w-[40px] rounded-full aspect-square overflow-hidden mr-4">
            {avatar && (
              <img className="object-contain" src={avatar} alt="user" />
            )}
          </div>
          <div>
            <div className="font-bold text-dynamicL">{username}</div>
            <div className="text-dynamicS text-textMuted">
              {dayjs(timestamp).format('DD MMM YYYY')}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ ...transition, repeatType: 'reverse' }}
          variants={textAnimation}
          className="text-dynamicM z-10"
        >
          {caption}
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={opacityAnimation}
          transition={{ ...transition, repeatType: 'reverse' }}
          className="absolute w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-dynamicIcon z-[5]"
        >
          {source && (
            <img
              src={source && socialMediaIcons[source]?.default}
              alt="icon"
              className="w-full"
            />
          )}
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={opacityAnimation}
          transition={{ ...transition, repeatType: 'reverse' }}
          className="w-[100%] h-[100%] top-0 left-0 z-[7] absolute bg-gradient-to-t from-black to-gray-700/60"
        />
      </>
    ) : (
      <div className="w-full right-0 absolute bottom-0 flex items-center justify-between z-[20] backdrop-blur-[30px] h-[13%] px-4 py-2">
        <div className="h-full flex items-center">
          {avatar && (
            <img
              className="mr-4 h-full aspect-square object-cover rounded-full"
              src={avatar}
              alt="card"
            />
          )}

          <div className="py-2">
            <p className="font-bold text-white text-dynamicM leading-1">
              {username}
            </p>
            <p className="text-white text-dynamicS">
              {dayjs(timestamp).format('DD MMM YYYY')}
            </p>
          </div>
        </div>

        <img
          className="mr-1 h-[90%]"
          src={source && socialMediaIcons[source]?.color}
          alt="social network icon"
        />
      </div>
    )}

    {media_type?.toLowerCase() === mediaTypes.VIDEO ? (
      <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="w-full h-full absolute z-10">
          <img
            src={VideoIcon}
            alt="video-icon"
            className="absolute right-5 top-5 w-[12%]"
          />
          <video loop autoPlay muted className="w-full h-full object-contain">
            <source src={media_url} type="video/mp4" />
          </video>
        </div>
        <div className="w-full h-full absolute blur-lg">
          <video muted className="w-full h-full object-cover">
            <source src={media_url} type="video/mp4" />
          </video>
        </div>
      </div>
    ) : (
      <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <motion.img
          className="object-cover w-full h-full"
          src={media_url}
          alt="background-img"
          initial={type === contentTypes.ANIMATED && 'initial'}
          animate={type === contentTypes.ANIMATED && 'animate'}
          variants={BackgroundImageAnimation}
          transition={{ ...transition, repeatType: 'reverse' }}
        />
      </div>
    )}
  </div>
);

export default TextCard;
