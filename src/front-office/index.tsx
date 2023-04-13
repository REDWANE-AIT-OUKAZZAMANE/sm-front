import Header from './Containers/Header';
import Cards from './Containers/Cards';
import RightContent from './Containers/RightContent';
import Footer from './Containers/Footer';

const Wall = () => (
  <div className=" text-white flex flex-col justify-between min-h-screen px-8 py-5">
    <Header />
    <div className="flex gap-x-10 justify-between w-full my-2">
      <Cards />
      <RightContent />
    </div>
    <Footer />
  </div>
);

export default Wall;
