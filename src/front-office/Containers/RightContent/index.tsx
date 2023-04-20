import video from '../../../assets/video.mp4';
import Card from '../../components/Card';
import qrcode from '../../../assets/qrcode.png';
import face from '../../../assets/human2.png';

const RightContent = () => (
  <div className="grid gap-10 h-max flex-col justify-between items-center">
    <Card
      type="static"
      source="instagram"
      caption=""
      timestamp=""
      media_url={video}
      avatar={face}
      username="Oussama"
      media_type="video"
      variantIsTall
    />
    <div className="flex items-center justify-center flex-col w-[14vw] mx-auto">
      <p className="text-[1.6vw]">Engage with us</p>
      <div className="max-w-[80%] flex items-center aspect-square rounded-2xl">
        <img className="" src={qrcode} alt="qrcode" />
      </div>
    </div>
  </div>
);

export default RightContent;
