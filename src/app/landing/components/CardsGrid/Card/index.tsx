import { motion } from 'framer-motion';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import PinnedIcon from './PinnedIcon';
import VideoIcon from '../../../../../assets/icons/video.svg';
import HighlightedText from '../HighlightedText';
import {
  contentTypes,
  mediaTypes,
  postTextCharacter,
  socialMediaIcons,
  socialMediaSources,
} from '../../../../utils/constants';
import { Media } from '../../../../types';
import {
  BackgroundImageAnimation,
  CardDescirptiontransition,
  opacityAnimation,
  textAnimation,
  variantsCardLeft,
  variantsCardRight,
  variantsDown,
  variantsTop,
  wallAnimationDelay,
  wallCardAnimationDuration,
} from './animationSettings';
import { postTextLimiter } from '../../../../utils';

type CardProps = {
  media: Media;
  type: string;
  variantIsTall?: boolean;
  maxCards: number;
  delay: number;
  index?: number;
};

const TextCard = ({
  media,
  type,
  variantIsTall,
  maxCards,
  delay,
  index,
}: CardProps) => {
  const [isTopcard, setIstopcard] = useState(
    index ? index < maxCards / 2 : false
  );

  const transitionCard = {
    duration: wallCardAnimationDuration,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    repeatDelay: wallAnimationDelay,
    delay,
  };

  useEffect(() => {
    setIstopcard(index ? index < maxCards / 2 : false);
  }, [maxCards, index]);

  const getVariant = () => {
    if (media.pinned) return undefined;
    if (variantIsTall) {
      return variantsCardRight;
    }
    if (index === 0 || index === maxCards / 2) {
      return variantsCardLeft;
    }
    if (isTopcard) {
      return variantsTop;
    }
    return variantsDown;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getVariant()}
      transition={transitionCard}
      style={{
        gridColumnEnd: variantIsTall ? maxCards / 2 + 2 : 'auto',
      }}
      className={classNames(
        `relative flex h-full flex-col justify-center gap-8 overflow-hidden rounded-md bg-gray-200/20 px-[6%]  `,
        {
          ' row-span-2 row-start-1 ': variantIsTall,
        }
      )}
    >
      {media.pinned && (
        <div className="absolute left-2 top-0 z-30 h-12 w-12">
          <PinnedIcon />
        </div>
      )}
      {type === contentTypes.ANIMATED ? (
        <>
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            variants={textAnimation}
            className="z-10 flex items-center"
          >
            <div className="mr-[3.8%] aspect-square h-[4.6vh] overflow-hidden rounded-full">
              {media?.owner && (
                <img
                  className="h-full object-cover"
                  src={media?.owner.avatar}
                  alt="user"
                />
              )}
            </div>
            <div>
              <div className="text-[1.7vh] font-bold">
                {media?.owner ? media?.owner.username : 'Unknown'}
              </div>
              <div className="text-[1.2vh] text-textMuted">
                {dayjs(media?.timestamp).format('DD MMM YYYY')}
              </div>
            </div>
          </motion.div>
          {!media?.textContainsOnlyHashtags && (
            <motion.div
              initial="initial"
              animate="animate"
              transition={{
                ...CardDescirptiontransition,
                repeatType: 'reverse',
              }}
              variants={textAnimation}
              className="leading-12 z-10 text-justify text-[1.5vh]"
            >
              <HighlightedText
                text={postTextLimiter(media?.text, postTextCharacter.limit)}
              />
            </motion.div>
          )}

          <motion.div
            initial="initial"
            animate="animate"
            variants={opacityAnimation}
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            className="absolute left-1/2 top-1/2 z-[5] w-[80%] -translate-x-1/2 -translate-y-1/2 transform text-dynamicIcon"
          >
            <img
              src={media?.source && socialMediaIcons[media?.source]?.default}
              alt="icon"
              className="w-full"
            />
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={opacityAnimation}
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            className="absolute left-0 top-0 z-[7] h-[100%] w-[100%] bg-gradient-to-t from-black to-gray-700/60"
          />
        </>
      ) : (
        <div className="absolute bottom-0 right-0 z-[20] flex h-[13%] w-full items-center justify-between backdrop-blur-[30px]">
          <div className="flex h-full items-center pl-[3.6%]">
            {media?.owner && (
              <img
                className="mr-[5%] aspect-square h-[70%] rounded-full object-cover"
                src={media?.owner.avatar}
                alt="card"
              />
            )}

            <div>
              <p className="leading-1 whitespace-nowrap text-[1.2vh] font-bold text-white">
                {media?.owner ? media?.owner.username : 'Unknown'}
              </p>
              <p className="whitespace-nowrap text-[0.8vh] text-white">
                {dayjs(media?.timestamp).format('DD MMM YYYY')}
              </p>
            </div>
          </div>

          {socialMediaIcons[media?.source]?.color && (
            <img
              className="h-[70%] pr-[3%]"
              src={socialMediaIcons[media?.source]?.color}
              alt="social network icon"
            />
          )}
        </div>
      )}

      {media?.source === socialMediaSources.YOUTUBE ? (
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
          <div className="absolute z-10 h-full w-full">
            <ReactPlayer
              width="100%"
              height="100%"
              url={media?.url}
              controls={false}
              playing
              loop
              muted
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </div>
      ) : media?.type === mediaTypes.VIDEO ? (
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
          <div className="absolute z-10 h-full w-full">
            <img
              src={VideoIcon}
              alt="video-icon"
              className="absolute right-5 top-5 w-[12%]"
            />

            <video loop autoPlay muted className="h-full w-full object-contain">
              <source src={media?.url} type="video/mp4" />
            </video>
          </div>
          <div className="absolute h-full w-full blur-lg">
            <video muted className="h-full w-full object-cover">
              <source src={media?.url} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
          <motion.img
            className="h-full w-full object-cover"
            src={media?.url}
            alt="background-img"
            initial={type === contentTypes.ANIMATED && 'initial'}
            animate={type === contentTypes.ANIMATED && 'animate'}
            variants={BackgroundImageAnimation}
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
          />
        </div>
      )}
    </motion.div>
  );
};
export default TextCard;
