import { motion } from 'framer-motion';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { youtubeQueryParams } from '../../../utils';
import VideoIcon from '../../../../../assets/icons/video.svg';
import HighlightedText from '../HighlightedText';
import {
  contentTypes,
  mediaTypes,
  socialMediaIcons,
  socialMediaSources,
} from '../../../utils/constants';
import { Media } from '../../../types';
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
  // console.log('card ', index, 'delay ', delay + wallAnimationDelay);
  useEffect(() => {
    setIstopcard(index ? index < maxCards / 2 : false);
  }, [maxCards, index]);

  const getVariant = () => {
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
      className={classNames(
        'relative overflow-hidden bg-gray-200/20 rounded-md px-[6%] flex flex-col gap-8 justify-center',
        {
          'aspect-[4.7/6.8] min-h-[37vh]': variantIsTall,
          'h-full': !variantIsTall,
        }
      )}
    >
      {type === contentTypes.ANIMATED ? (
        <>
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            variants={textAnimation}
            className="flex items-center z-10"
          >
            <div className="h-[4.6vh] rounded-full aspect-square overflow-hidden mr-[3.8%]">
              {media.owner && (
                <img
                  className="object-cover h-full"
                  src={media.owner.avatar}
                  alt="user"
                />
              )}
            </div>
            <div>
              <div className="font-bold text-[1.7vh]">
                {media.owner ? media.owner.username : 'Unknown'}
              </div>
              <div className="text-[1.2vh] text-textMuted">
                {dayjs(media.timestamp).format('DD MMM YYYY')}
              </div>
            </div>
          </motion.div>
          {!media.textContainsOnlyHashtags && (
            <motion.div
              initial="initial"
              animate="animate"
              transition={{
                ...CardDescirptiontransition,
                repeatType: 'reverse',
              }}
              variants={textAnimation}
              className="text-[1.5vh] z-10 text-justify leading-12"
            >
              <HighlightedText text={media?.text} />
            </motion.div>
          )}

          <motion.div
            initial="initial"
            animate="animate"
            variants={opacityAnimation}
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            className="absolute w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-dynamicIcon z-[5]"
          >
            <img
              src={media.source && socialMediaIcons[media.source]?.default}
              alt="icon"
              className="w-full"
            />
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={opacityAnimation}
            transition={{ ...CardDescirptiontransition, repeatType: 'reverse' }}
            className="w-[100%] h-[100%] top-0 left-0 z-[7] absolute bg-gradient-to-t from-black to-gray-700/60"
          />
        </>
      ) : (
        <div className="w-full right-0 absolute bottom-0 flex items-center justify-between z-[20] backdrop-blur-[30px] h-[13%]">
          <div className="h-full flex items-center pl-[3.6%]">
            {media.owner && (
              <img
                className="mr-[5%] h-[70%] aspect-square object-cover rounded-full"
                src={media.owner.avatar}
                alt="card"
              />
            )}

            <div>
              <p className="font-bold text-white text-[1.2vh] leading-1 whitespace-nowrap">
                {media.owner ? media.owner.username : 'Unknown'}
              </p>
              <p className="text-white text-[0.8vh] whitespace-nowrap">
                {dayjs(media.timestamp).format('DD MMM YYYY')}
              </p>
            </div>
          </div>

          {socialMediaIcons[media.source]?.color && (
            <img
              className="h-[70%] pr-[3%]"
              src={socialMediaIcons[media.source]?.color}
              alt="social network icon"
            />
          )}
        </div>
      )}

      {media.source?.toUpperCase() === socialMediaSources.YOUTUBE ? (
        <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full h-full absolute z-10">
            <iframe
              width="100%"
              height="100%"
              src={youtubeQueryParams(media.url, media.id)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : media.type.toUpperCase() === mediaTypes.VIDEO ? (
        <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full h-full absolute z-10">
            <img
              src={VideoIcon}
              alt="video-icon"
              className="absolute right-5 top-5 w-[12%]"
            />
            <video loop autoPlay muted className="w-full h-full object-contain">
              <source src={media.url} type="video/mp4" />
            </video>
          </div>
          <div className="w-full h-full absolute blur-lg">
            <video muted className="w-full h-full object-cover">
              <source src={media.url} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : (
        <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <motion.img
            className="object-cover w-full h-full"
            src={media.url}
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
