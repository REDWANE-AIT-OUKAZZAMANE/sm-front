import { Status, useAsyncState } from 'react-async-states';

import Header from './components/Header';
import Cards from './components/CardsGrid';
import Footer from './components/Footer';
import { mediaPosts } from './data/sources/PostsSource';
import { stompClientSource } from './data/sources/ClientSource';
import Spinner from './components/Spinner';
import { AnimationContextProvider } from './contexts/animationContext';
import { pinedPost } from './data/sources/PinnedPostSource';
import { hiddenPost } from './data/sources/HiddenMediaSource';
import { announcements } from './data/sources/AnnouncementsSource';
import defaultSelector from '../../api/selector';

const defaultFilter = {
  sort: 'timestamp,desc',
  'hidden.eq': false,
};
const Landing = () => {
  const {
    state: { isSuccess, isPending },
  } = useAsyncState({
    source: mediaPosts,
    selector: defaultSelector,
  });
  const {
    state: { isSuccess: isClientConnected },
  } = useAsyncState.auto({
    source: stompClientSource,
    selector: defaultSelector,
    events: {
      change: [
        {
          status: Status.success,
          handler() {
            mediaPosts.run(defaultFilter);
            pinedPost.run();
            announcements.run();
            hiddenPost.run();
          },
        },
      ],
    },
  });

  return isClientConnected ? (
    <div className="min-h-screen w-screen bg-darkBlue">
      <div className="flex min-h-screen flex-col justify-between px-8 pt-5 text-white">
        <Header />
        <div className="my-[4vh] flex w-full flex-1 grow items-stretch justify-between gap-x-[2vw]">
          {isSuccess && (
            <AnimationContextProvider>
              <Cards />
            </AnimationContextProvider>
          )}
          {isPending && (
            <div className="grid w-full place-items-center">
              <Spinner className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center bg-darkBlue text-white">
      <Spinner className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
    </div>
  );
};

export default Landing;
