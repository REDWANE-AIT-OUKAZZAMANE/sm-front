import React from "react";
import sponsor from "../../../assets/Sponsor.png";
import XLogo from "../../../assets/XLogo.png";
import heart from "../../../assets/heart.png";
const Footer = () => {
  const data = [
    {
      title: "Orginized By",
      images: [XLogo],
    },
    {
      title: "Co-organizer",
      images: [sponsor],
    },
    {
      title: "Institutional partners",
      images: [sponsor, sponsor, sponsor],
    },
    {
      title: "Sponsors",
      images: [sponsor, sponsor],
    },
  ];
  return (
    <div className="p-2 w-full flex justify-between items-center mt-20">
      {data.map((el, idx) => (
        <div key={`gouep-${idx}`} className="h-full">
          <p className="text-dynamicM text-textOrange mb-4 h-[20%]">
            {el.title}
          </p>
          <div className="flex h-[80%] gap-5">
            {el.images.map((source, idy) => (
              <img
                key={`sponsor-${idx}-${idy}`}
                className="h-full w-[5.7vw] object-contain mt-1"
                src={source}
                alt=""
              />
            ))}
          </div>
        </div>
      ))}
      <div className="">
        <p className="flex h-full text-[1.8vw] items-baseline mt-[10%]  font-['Lato'] mr-20">
          Made with{" "}
          <img src={heart} alt="" className="w-[2vw] mx-2 relative top-1" /> By{" "}
          <img
            src={XLogo}
            alt="logo"
            className="w-[3.8vw] ml-2 relative top-1"
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
