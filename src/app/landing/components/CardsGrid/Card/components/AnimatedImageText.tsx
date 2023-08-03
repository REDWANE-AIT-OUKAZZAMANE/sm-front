import dayjs from 'dayjs';

import { testIds } from '../../../../../../tests/constants';
import { Media } from '../../../../../types';
import { postTextLimiter } from '../../../../../utils';
import {
  postTextCharacter,
  socialMediaIcons,
} from '../../../../../utils/constants';
import HighlightedText from '../../HighlightedText';

function AnimatedImageText({ media }: { media: Media }) {
  return (
    <>
      <div className="media-text z-10 flex items-center">
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
      </div>
      {!media?.textContainsOnlyHashtags && (
        <div className="media-text leading-12 z-10 text-justify text-[1.5vh]">
          <HighlightedText
            text={postTextLimiter(media?.text, postTextCharacter.limit)}
          />
        </div>
      )}

      <div className="opacity-animation absolute left-1/2 top-1/2 z-[5] w-[80%] -translate-x-1/2 -translate-y-1/2 transform text-dynamicIcon">
        <img
          src={media?.source && socialMediaIcons[media?.source]?.default}
          alt="icon"
          className="w-full"
          data-testid={testIds.landing.Card.socialIcon}
        />
      </div>

      <div className="opacity-animation absolute left-0 top-0 z-[7] h-[100%] w-[100%] bg-gradient-to-t from-black to-gray-700/60" />
    </>
  );
}

export default AnimatedImageText;
