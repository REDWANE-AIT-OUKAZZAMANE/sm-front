import ReactPlayer from 'react-player';

import { testIds } from '../../../../../../tests/constants';
import { Media } from '../../../../../types';

function YoutubeVideo({ media }: { media: Media }) {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
      <div className="absolute z-10 h-full w-full">
        <ReactPlayer
          data-testid={testIds.landing.Card.youtubeVideo}
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
  );
}

export default YoutubeVideo;
