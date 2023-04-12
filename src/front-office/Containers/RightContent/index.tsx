import video from "../../../assets/video.mp4";
import Card from "../../components/Card";
import qrcode from "../../../assets/qrcode.png";
import face from "../../../assets/human2.png";

const RightContent = () => {
  return (
    <div className="flex-1 grid gap-10 h-full w-full flex-col justify-between m-5">
      <Card
        type="static"
        source="ig"
        content=""
        date="11 Apr 2023"
        media={video}
        avatar={face}
        username="Oussama"
        mediaType="video"
        variantIsTall
      />
      <div className="flex items-center justify-center flex-col">
        <p className="text-dynamicXL">Engage with us</p>
        <div className="w-[12.5vw] flex items-center aspect-square rounded-2xl">
          <img className="w-full" src={qrcode} alt="qrcode" />
        </div>
      </div>
    </div>
  );
};

export default RightContent;
