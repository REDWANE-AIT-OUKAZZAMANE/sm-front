import { Status, useAsyncState } from 'react-async-states';

import Header from './components/Header';
import Cards from './components/CardsGrid';
import AnnouncementOrPost from './components/AnnouncementOrPost';
import Footer from './components/Footer';
import { mediaPosts } from './data/sources/PostsSource';
import { stompClientSource } from './data/sources/ClientSource';
import Spinner from './components/Spinner';

const Landing = () => {
  const { state: postsState } = useAsyncState.auto(mediaPosts);
  const { state: clientState } = useAsyncState.auto(stompClientSource);

  return (
    <div className="bg-darkBlue min-h-screen w-screen">
      {clientState.status === Status.success && (
        <div className="text-white flex flex-col justify-between min-h-screen px-8 py-5">
          <Header />
          <div className="grow flex gap-x-[2vw] flex-1 justify-between items-stretch w-full my-[4vh]">
            {postsState.status === Status.success && (
              <Cards posts={postsState.data} />
            )}
            {postsState.status === Status.pending && (
              <div className="w-full grid place-items-center">
                <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
              </div>
            )}
            <AnnouncementOrPost />
          </div>
          <Footer />
        </div>
      )}
      {clientState.status === Status.pending && (
        <div className="grid h-screen place-content-center">
          <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
        </div>
      )}
    </div>
  );
};

export default Landing;
