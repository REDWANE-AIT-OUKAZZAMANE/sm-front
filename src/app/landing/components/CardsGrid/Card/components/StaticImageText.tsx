import dayjs from 'dayjs';

import { testIds } from '../../../../../../tests/constants';
import { Media } from '../../../../../types';
import { socialMediaIcons } from '../../../../../utils/constants';

function StaticImageText({ media }: { media: Media }) {
  return (
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
          data-testid={testIds.landing.Card.socialIcon}
        />
      )}
    </div>
  );
}

export default StaticImageText;
