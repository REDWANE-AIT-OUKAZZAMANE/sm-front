import classNames from 'classnames';
import { useEffect, useState } from 'react';

import PinnedIcon from './components/PinnedIcon';
import {
  contentTypes,
  mediaTypes,
  socialMediaSources,
} from '../../../../utils/constants';
import { Media } from '../../../../types';
import { wallAnimationDelay } from './animationSettings';
import { testIds } from '../../../../../tests/constants';
import AnimatedImageText from './components/AnimatedImageText';
import StaticImageText from './components/StaticImageText';
import YoutubeVideo from './components/YoutubeVideo';
import NormalVideo from './components/NormalVideo';
import AnimatedBackground from './components/AnimatedBackground';
import './styles.scss';

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
  const [variant, setVariant] = useState('');
  const [displayed, setDisplayed] = useState(true);

  const getVariant = () => {
    if (media.pinned) return '';
    if (variantIsTall) {
      return 'right-card';
    }
    if (index === 0 || index === maxCards / 2) {
      return 'left-card';
    }
    if (index && index < maxCards / 2) {
      return 'top-card';
    }
    return 'down-card';
  };

  useEffect(() => {
    setVariant(getVariant());
    setTimeout(() => setDisplayed(false), wallAnimationDelay * 1000);
  }, []);

  return (
    <div
      style={{
        gridColumnEnd: variantIsTall ? maxCards / 2 + 2 : 'auto',
        animationDelay: `${delay}s`,
        opacity: media.pinned || !displayed ? 1 : 0,
      }}
      className={classNames(
        `relative ${
          !displayed && !media.pinned ? `${variant}-reverse` : variant
        } flex h-full flex-col justify-center gap-8 overflow-hidden rounded-md bg-gray-200/20 px-[6%]  `,
        {
          ' row-span-2 row-start-1 ': variantIsTall,
        }
      )}
      data-testid={testIds.landing.Card.container}
    >
      {media.pinned && <PinnedIcon />}
      {type === contentTypes.ANIMATED ? (
        <AnimatedImageText media={media} />
      ) : (
        <StaticImageText media={media} />
      )}

      {media?.source === socialMediaSources.YOUTUBE ? (
        <YoutubeVideo media={media} />
      ) : media?.type === mediaTypes.VIDEO ? (
        <NormalVideo media={media} />
      ) : (
        <AnimatedBackground media={media} type={type} />
      )}
    </div>
  );
};

export default TextCard;
