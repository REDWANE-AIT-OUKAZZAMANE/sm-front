import Header from './Containers/Header';
import Cards from './Containers/Cards';
import RightContent from './Containers/RightContent';
import Footer from './Containers/Footer';
import { Post } from './models/Post';

const Wall = () => {
  const posts: Post[] = [];
  return (
    <div className=" text-white flex flex-col justify-between min-h-screen px-8 py-5">
      <Header />
      <div className="flex gap-x-10 justify-between w-full my-2">
        <Cards posts={posts} />
        <RightContent />
      </div>
      <Footer />
    </div>
  );
};

export default Wall;
