import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';

import {
  PinIcon,
  UnpinIcon,
  HideIcon,
  ShowIcon,
} from '../../components/CustomIcons';
import { mediaTypes, socialMediaSources } from '../../../utils/constants';
import { Media } from '../../../types';

type MediaCardProps = {
  media: Media;
  onTogglePinning: Function;
  onToggleVisibility: Function;
};

export default function MediaCard(props: MediaCardProps) {
  const { media, onTogglePinning, onToggleVisibility } = props;

  const { type: mediaType, url: mediaUrl } =
    media.type === mediaTypes.CAROUSEL_ALBUM ? media.children[0] : media;

  const handleTogglePinning = () => {
    onTogglePinning(media);
  };

  const handleToggleVisibility = () => {
    onToggleVisibility(media);
  };

  return (
    <div className="flex flex-col divide-y border rounded-2xl overflow-hidden shadow-md">
      <div className="h-72">
        {mediaType === mediaTypes.IMAGE ? (
          <img
            className="object-cover w-full h-full"
            src={mediaUrl}
            alt="Media"
          />
        ) : (
          <ReactPlayer
            className="object-cover"
            width="100%"
            height="100%"
            url={mediaUrl}
            muted
          />
        )}
      </div>
      <div className="flex-1 p-4 space-y-4">
        <div>
          {media.source === socialMediaSources.YOUTUBE ? (
            <a href={mediaUrl} target="_blank">
              <h5 className="text-lg font-medium tracking-tight">
                {media.owner?.username || 'Unknown'}
              </h5>
            </a>
          ) : (
            <h5 className="text-lg font-medium tracking-tight">
              {media.owner?.username || 'Unknown'}
            </h5>
          )}
          <div className="text-sm font-normal text-gray-500">
            <span className="capitalize">{media.source.toLowerCase()}</span> |{' '}
            {dayjs(media.timestamp).format('MMM DD, YYYY')}
          </div>
        </div>
        <h5 className="text-lg font-medium tracking-tight">
          {media.sourceTypes.join(', ')}
        </h5>
        <div>
          <Tooltip title={media.text} trigger="hover">
            <p className="font-normal line-clamp-3">{media.text}</p>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <button
          onClick={handleTogglePinning}
          type="button"
          className="flex-1 bg-transparent text-[#5F4080] hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
        >
          {media.pinned ? (
            <UnpinIcon className="w-5 h-5 mr-2 -ml-1" />
          ) : (
            <PinIcon className="w-5 h-5 mr-2 -ml-1" />
          )}
          {media.pinned ? 'Unpin' : 'Pin'} post
        </button>
        <button
          onClick={handleToggleVisibility}
          type="button"
          className="flex-1 text-center text-white bg-[#5F4080] hover:bg-[#492E65] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
        >
          {media.hidden ? (
            <ShowIcon className="w-5 h-5 mr-2 -ml-1" />
          ) : (
            <HideIcon className="w-5 h-5 mr-2 -ml-1" />
          )}
          {media.hidden ? 'Show' : 'Hide'} post
        </button>
      </div>
    </div>
  );
}
