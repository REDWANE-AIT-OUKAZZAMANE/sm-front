import { testIds } from '../../../../../../tests/constants';
import { Media } from '../../../../../types';
import VideoIcon from '../../../../../../assets/icons/video.svg';

function NormalVideo({ media }: { media: Media }) {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
      <div className="absolute z-10 h-full w-full">
        <img
          src={VideoIcon}
          alt="video-icon"
          className="absolute right-5 top-5 w-[12%]"
        />

        <video
          loop
          autoPlay
          muted
          className="h-full w-full object-contain"
          data-testid={testIds.landing.Card.video}
        >
          <source src={media?.url} type="video/mp4" />
        </video>
      </div>
      <div className="absolute h-full w-full blur-lg">
        <video muted className="h-full w-full object-cover">
          <source src={media?.url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default NormalVideo;
