import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import {
  PinIcon,
  UnpinIcon,
  HideIcon,
  ShowIcon,
} from '../../components/CustomIcons';
import { Media } from '../../../types';
import { mediaTypes } from '../../../utils/constants';

type MediaCardProps = {
  media: Media;
  onTogglePinning: Function;
  onToggleVisibility: Function;
};

export default function MediaCard(props: MediaCardProps) {
  const thumbnail = props.media.thumbnail || props.media.url;

  const handleTogglePinning = () => {
    props.onTogglePinning();
  };

  const handleToggleVisibility = () => {
    props.onToggleVisibility();
  };

  const renderMediaVisual = () => {
    if (!props.media.thumbnail && props.media.type === mediaTypes.VIDEO) {
      // render the video without controls
      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="object-cover w-full h-full">
          <source src={props.media.url} />
        </video>
      );
    }

    if (thumbnail) {
      return (
        <img
          className="object-cover w-full h-full"
          src={thumbnail}
          alt="Media"
        />
      );
    }

    return null;
  };

  return (
    <div
      className={classNames(
        `flex flex-col divide-y border rounded-2xl overflow-hidden shadow-md `,
        {
          ' order-[-1]': props.media.pinned,
          'border-lightRed border-2': !props.media.clean,
        }
      )}
    >
      <div className="relative h-72">
        {renderMediaVisual()}

        {props.media.type === mediaTypes.VIDEO && (
          <div className="text-white text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <PlayCircleOutlined rev={undefined} />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <div>
          <a href={props.media.permalink} target="_blank">
            <h5 className="text-xl font-semibold tracking-tight">
              {props.media.owner?.username || 'Unknown'}
            </h5>
          </a>
          <div className="text-md font-normal text-gray-500">
            <span className="capitalize">
              {props.media.source.toLowerCase()}
            </span>{' '}
            | {dayjs(props.media.timestamp).format('MMM DD, YYYY')}
          </div>
        </div>
        <h5 className="text-xl h-7 font-semibold line-clamp-1 tracking-tight">
          {props.media.sourceTypes?.join(', ')}
        </h5>
        <Tooltip title={props.media.text} trigger="hover">
          <p className="text-xl font-medium text-justify line-clamp-3">
            {props.media.text}
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <button
          onClick={handleTogglePinning}
          type="button"
          className="flex-1 text-xPurple active:bg-xPurple active:text-white hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
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
          className="flex-1 text-xPurple active:bg-xPurple active:text-white hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
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
