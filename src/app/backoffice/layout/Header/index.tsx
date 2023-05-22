import logoutIcon from '../../../../assets/icons/logout.svg';

function Header() {
  return (
    <div className=" h-[93px] flex justify-between items-center px-[34px]">
      <h1 className="text-textBlack text-[37px] font-semibold">Title</h1>
      <div className="cursor-pointer">
        <img src={logoutIcon} alt="logout_icon" />
      </div>
    </div>
  );
}

export default Header;
