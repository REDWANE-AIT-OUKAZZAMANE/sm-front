import { Status, useAsyncState } from 'react-async-states';

import Header from './Containers/Header';
import Cards from './Containers/Cards';
import RightContent from './Containers/RightContent';
import Footer from './Containers/Footer';
import { mediaPosts } from './data/sources/PostsSource';
import Spinner from './components/Spinner';

const Wall = () => {
  const { state } = useAsyncState.auto(mediaPosts);

  return (
    <div className=" text-white flex flex-col justify-between min-h-screen px-8 py-5">
      <Header />
      <div className="grow flex gap-x-[2vw] flex-1 justify-between items-stretch w-full my-[4vh]">
        {state.status === Status.success && <Cards posts={state.data} />}
        {state.status === Status.pending && (
          <div className="w-full grid place-items-center">
            <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
          </div>
        )}
        <RightContent />
      </div>
      <Footer />
    </div>
  );
};

export default Wall;
