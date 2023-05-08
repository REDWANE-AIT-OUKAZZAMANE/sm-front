import bell from '../../../assets/icons/bell.svg';

const Annoucements = () => (
  <div className="flex flex-col gap-8 justify-center h-[44vh] items-center border-[5px] border-textOrange aspect-[4.7/6.8] p-[6%]">
    <img src={bell} alt="icon" className="w-[25%]" />
    <h1 className="text-3xl font-semibold text-textOrange">ANNOUNCEMENTS</h1>
    <p className="text-xl text-center">
      Closing keynote Join us for the closing Keynote 4:00 PM @ the swimming
      pool, many gifts to win
    </p>
  </div>
);

export default Annoucements;
