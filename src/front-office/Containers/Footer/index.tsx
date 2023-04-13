import sponsor from '../../../assets/Sponsor.png';
import XLogo from '../../../assets/XLogo.png';
import heart from '../../../assets/heart.png';

const data = [
  {
    id: 0,
    title: 'Orginized By',
    images: [XLogo],
  },
  {
    id: 1,
    title: 'Co-organizer',
    images: [sponsor],
  },
  {
    id: 2,
    title: 'Institutional partners',
    images: [sponsor, sponsor, sponsor],
  },
  {
    id: 3,
    title: 'Sponsors',
    images: [sponsor, sponsor],
  },
];

const Footer = () => (
  <div className="p-2 w-full flex justify-between items-center max-h-[15%]">
    {data.map((el) => (
      <div key={el.id} className="h-full">
        <p className="text-dynamicM text-textOrange mb-4 h-[20%]">{el.title}</p>
        <div className="flex h-[80%] gap-5">
          {el.images.map((source) => (
            <img
              key={Math.random()}
              className="h-full w-[5.7vw] object-contain mt-1"
              src={source}
              alt=""
            />
          ))}
        </div>
      </div>
    ))}
    <div className="">
      <p className="flex h-full text-[1.8vw] items-baseline mt-[10%] font-['Lato'] mr-20">
        Made with{' '}
        <img src={heart} alt="" className="w-[2vw] mx-2 relative top-1" /> By{' '}
        <img src={XLogo} alt="logo" className="w-[3.8vw] ml-2 relative top-1" />
      </p>
    </div>
  </div>
);

export default Footer;
