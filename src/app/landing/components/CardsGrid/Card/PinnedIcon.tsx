import pushpinBackground from '../../../../../assets/pushpinBackground.svg';
import pushpin from '../../../../../assets/icons/pushpin.svg';

const PinnedIcon = () => (
  <div className="w-15 absolute left-2 top-0 z-30 h-20">
    <img
      src={pushpinBackground}
      alt="pushpin-background"
      className="h-17 w-20"
    />
    <img
      src={pushpin}
      alt="pushpin-icon"
      className="absolute left-1/2 top-[38%] h-6 w-8 -translate-x-1/2 translate-y-0 transform"
    />
  </div>
);

export default PinnedIcon;
