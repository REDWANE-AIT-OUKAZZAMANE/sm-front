import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';

import {
  PinIcon,
  UnpinIcon,
  HideIcon,
  ShowIcon,
} from '../../components/CustomIcons';
import { mediaTypes } from '../../../utils/constants';
import { Media } from '../../../types';

type MediaCardProps = {
  media: Media;
  onTogglePinning: Function;
  onToggleVisibility: Function;
};

export default function MediaCard(props: MediaCardProps) {
  // TODO: API should return the type and url directly in the parent object
  const { type: mediaType, url: mediaUrl } =
    props.media.type === mediaTypes.CAROUSEL_ALBUM
      ? props.media.children[0]
      : props.media;

  const handleTogglePinning = () => {
    props.onTogglePinning();
  };

  const handleToggleVisibility = () => {
    props.onToggleVisibility();
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
          <a href={props.media.permalink || mediaUrl} target="_blank">
            <h5 className="text-lg font-medium tracking-tight">
              {props.media.owner?.username || 'Unknown'}
            </h5>
          </a>
          <div className="text-sm font-normal text-gray-500">
            <span className="capitalize">
              {props.media.source.toLowerCase()}
            </span>{' '}
            | {dayjs(props.media.timestamp).format('MMM DD, YYYY')}
          </div>
        </div>
        <h5 className="text-lg font-medium tracking-tight">
          {props.media.sourceTypes.join(', ')}
        </h5>
        <div>
          <Tooltip title={props.media.text} trigger="hover">
            <p className="font-normal line-clamp-3">{props.media.text}</p>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <button
          onClick={handleTogglePinning}
          type="button"
          className="flex-1 bg-transparent text-[#5F4080] hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
        >
          {props.media.pinned ? (
            <UnpinIcon className="w-5 h-5 mr-2 -ml-1" />
          ) : (
            <PinIcon className="w-5 h-5 mr-2 -ml-1" />
          )}
          {props.media.pinned ? 'Unpin' : 'Pin'} post
        </button>
        <button
          onClick={handleToggleVisibility}
          type="button"
          className="flex-1 text-center text-white bg-[#5F4080] hover:bg-[#492E65] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
        >
          {props.media.hidden ? (
            <ShowIcon className="w-5 h-5 mr-2 -ml-1" />
          ) : (
            <HideIcon className="w-5 h-5 mr-2 -ml-1" />
          )}
          {props.media.hidden ? 'Show' : 'Hide'} post
        </button>
      </div>
    </div>
  );
}
