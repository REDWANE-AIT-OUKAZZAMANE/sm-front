import qrcode from '../../../assets/qrcode.svg';
import Annoucements from '../../components/Anouncments';

const RightContent = () => (
  <div className="flex flex-col justify-between items-center gap-y-2">
    <Annoucements />
    <div className="flex items-center justify-center flex-col max-h-[17vh] mx-auto">
      <p className="text-[2.2vh]">Engage with us</p>
      <div className="max-h-[16vh] flex items-center aspect-square rounded-2xl">
        <img className="" src={qrcode} alt="qrcode" />
      </div>
    </div>
  </div>
);

export default RightContent;
