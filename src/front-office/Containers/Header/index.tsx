import logo from '../../../assets/logo.png';
import IGIcon from '../../../assets/icons/ig-white.svg';
import YoutubeIcon from '../../../assets/icons/yt-white.svg';

const Header = () => (
  <div className="flex items-center justify-between">
    <img className="w-[20vw] max-w-sm" src={logo} alt="logo" />

    <div className="text-2xl">
      <span>#DevoxxMa, </span>
      <span>@DevoxxMa</span>

      <div className="flex items-center space-x-4 mt-2">
        <img className="w-7" src={IGIcon} alt="instagram icon" />
        <img className="w-7" src={YoutubeIcon} alt="youtube icon" />
        <p className="ml-7">Join us live</p>
      </div>
    </div>
  </div>
);

export default Header;
