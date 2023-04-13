import logo from "../../../assets/logo.png";
import IGIcon from "../../../assets/icons/ig-white.svg";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-0">
      <img className="w-[20vw]" src={logo} alt="logo" />

      <div className="text-dynamicL">
        <span>#DevoxxMa, </span>
        <span>@DevoxxMa</span>

        <div className="flex items-center space-x-4">
          <span>
            <img className="w-[1.2vw]" src={IGIcon} alt="ig-icon" />
          </span>
          <p>Join us live</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
