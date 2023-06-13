import pushpinBackground from '../../../../../assets/pushpinBackground.svg';
import pushpin from '../../../../../assets/icons/pushpin.svg';

const PinnedIcon = () => (
  <div className="absolute top-0 left-2 w-15 h-20 z-30">
    <img
      src={pushpinBackground}
      alt="pushpin-background"
      className="w-20 h-17"
    />
    <img
      src={pushpin}
      alt="pushpin-icon"
      className="w-8 h-6 absolute top-[38%] left-1/2 transform -translate-x-1/2 translate-y-0"
    />
  </div>
);

export default PinnedIcon;
