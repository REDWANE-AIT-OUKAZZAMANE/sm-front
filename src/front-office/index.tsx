import { Status, useAsyncState } from 'react-async-states';

import Header from './Containers/Header';
import Cards from './Containers/Cards';
import RightContent from './Containers/RightContent';
import Footer from './Containers/Footer';
import { mediaPosts } from './data/sources/PostsSource';

const Wall = () => {
  const { state } = useAsyncState.auto(mediaPosts);

  return (
    <div className=" text-white flex flex-col justify-between min-h-screen px-8 py-5">
      <Header />
      <div className="flex gap-x-10 justify-between w-full my-2">
        {state.status === Status.success && <Cards posts={state.data} />}
        <RightContent />
      </div>
      <Footer />
    </div>
  );
};

export default Wall;
