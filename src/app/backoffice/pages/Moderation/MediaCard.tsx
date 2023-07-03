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
        <video className="h-full w-full object-cover">
          <source src={props.media.url} />
        </video>
      );
    }

    if (thumbnail) {
      return (
        <img
          className="h-full w-full object-cover"
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
        `flex flex-col divide-y overflow-hidden rounded-2xl border shadow-md `,
        {
          ' order-[-1]': props.media.pinned,
          'border-2 border-lightRed': !props.media.clean,
        }
      )}
    >
      <div className="relative h-72">
        {renderMediaVisual()}

        {props.media.type === mediaTypes.VIDEO && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl text-white">
            <PlayCircleOutlined rev={undefined} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-4">
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
        <h5 className="line-clamp-1 h-7 text-xl font-semibold tracking-tight">
          {props.media.sourceTypes?.join(', ')}
        </h5>
        <Tooltip title={props.media.text} trigger="hover">
          <p className="line-clamp-3 text-justify text-xl font-medium">
            {props.media.text}
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <button
          onClick={handleTogglePinning}
          type="button"
          className="inline-flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-xPurple hover:bg-gray-100 focus:outline-none active:bg-xPurple active:text-white"
        >
          {props.media.pinned ? (
            <UnpinIcon className="-ml-1 mr-2 h-5 w-5" />
          ) : (
            <PinIcon className="-ml-1 mr-2 h-5 w-5" />
          )}
          {props.media.pinned ? 'Unpin' : 'Pin'} post
        </button>
        <button
          onClick={handleToggleVisibility}
          type="button"
          className="inline-flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-xPurple hover:bg-gray-100 focus:outline-none active:bg-xPurple active:text-white"
        >
          {props.media.hidden ? (
            <ShowIcon className="-ml-1 mr-2 h-5 w-5" />
          ) : (
            <HideIcon className="-ml-1 mr-2 h-5 w-5" />
          )}
          {props.media.hidden ? 'Show' : 'Hide'} post
        </button>
      </div>
    </div>
  );
}
