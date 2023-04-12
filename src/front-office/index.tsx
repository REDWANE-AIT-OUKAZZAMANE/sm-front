import Header from "./Containers/Header";
import Cards from "./Containers/Cards";
import RightContent from "./Containers/RightContent";
import Footer from "./Containers/Footer";

const Wall = () => {
  return (
    <div className=" text-white flex flex-col justify-between min-h-screen p-[34px]">
      <Header />
      <div className="flex w-full items-center">
        <Cards />
        <RightContent />
      </div>
      <Footer />
    </div>
  );
};

export default Wall;
