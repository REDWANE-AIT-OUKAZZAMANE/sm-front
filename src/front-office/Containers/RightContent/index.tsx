import qrcode from '../../../assets/qrcode.png';
import Annoucements from '../../components/Anouncments';

const RightContent = () => (
  <div className="grid gap-10 h-max flex-col justify-between items-center">
    <Annoucements />
    <div className="flex items-center justify-center flex-col w-[25vh] mx-auto">
      <p className="text-[2.2vh]">Engage with us</p>
      <div className="max-w-[70%] flex items-center aspect-square rounded-2xl">
        <img className="" src={qrcode} alt="qrcode" />
      </div>
    </div>
  </div>
);

export default RightContent;
