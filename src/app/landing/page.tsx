import { useEffect } from 'react';
import { Status, useAsyncState } from 'react-async-states';

import Header from './components/Header';
import Cards from './components/CardsGrid';
import AnnouncementOrPost from './components/AnnouncementOrPost';
import Footer from './components/Footer';
import { mediaPosts } from './data/sources/PostsSource';
import { stompClientSource } from './data/sources/ClientSource';
import Spinner from './components/Spinner';
import { AnimationContextProvider } from './contexts/animationContext';

const Landing = () => {
  const { state: clientState } = useAsyncState.auto(stompClientSource);
  const { state: postsState, run: runPosts } = useAsyncState(mediaPosts);

  useEffect(() => {
    if (clientState.status === Status.success) {
      // @ts-ignore
      runPosts();
    }
  }, [clientState.status, runPosts]);

  return clientState.status === Status.success ? (
    <div className="bg-darkBlue min-h-screen w-screen">
      <div className="text-white flex flex-col justify-between min-h-screen px-8 pt-5">
        <Header />
        <div className="grow flex gap-x-[2vw] flex-1 justify-between items-stretch w-full my-[4vh]">
          {postsState.status === Status.success && (
            <AnimationContextProvider posts={postsState.data}>
              <Cards />
              <AnnouncementOrPost />
            </AnimationContextProvider>
          )}
          {postsState.status === Status.pending && (
            <div className="w-full grid place-items-center">
              <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="bg-darkBlue text-white w-screen h-screen flex items-center justify-center">
      <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
    </div>
  );
};

export default Landing;
