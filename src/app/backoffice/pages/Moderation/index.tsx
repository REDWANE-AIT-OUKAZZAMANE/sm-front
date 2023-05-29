import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { ProducerProps, Status } from 'async-states';

import { app } from '../../../app';
import { API } from '../../../../api';
import MediaCard from './MediaCard';
import paths from '../../../../api/paths';
import { Media, Page, QueryParams } from '../../../types';
import { togglePinMediaProducer } from '../../data/producers/pinnedPostProducer';
import PostsFilter from './FilterForm';

async function searchMedia(
  props: ProducerProps<Page<Media>, Error, never, [QueryParams]>
): Promise<Page<Media>> {
  const controller = new AbortController();
  props.onAbort(() => controller.abort());

  const usersResponse = await API.get(paths.MEDIA, {
    signal: controller.signal,
    params: props.args[0],
  });
  return usersResponse.data;
}

const defaultFilter = {
  page: 0,
  size: 15,
  sort: 'timestamp,desc',
};

function Moderation() {
  const { state, run } = app.media.search.inject(searchMedia).useAsyncState();
  const { status, data } = state;
  const { state: toggleState, run: runTogglePin } = app.media.toggle_media
    .inject(togglePinMediaProducer)
    .useAsyncState();
  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [filter, setFilter] = useState(defaultFilter);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTogglePinning = (mediaId: string) => {
    runTogglePin(mediaId);
    console.log('Handle toggle pinning: ', mediaId);
  };

  useEffect(() => {
    if (toggleState.status === Status.success) {
      setIsRefreshing(true);
      run({ ...filter, size: filter.size * (filter.page + 1), page: 0 });
    }
  }, [toggleState]);

  const handleToggleVisibility = (mediaId: string) => {
    console.log('Handle toggle visibility: ', mediaId);
  };

  const fetchMoreMedia = () => {
    setIsRefreshing(false);
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    run(filter);
  }, [run, filter]);

  useEffect(() => {
    if (status === Status.success) {
      // when refreshing we dont need previous data cause it will get refetched

      if (!isRefreshing) {
        setAllMedia((prev) => [...prev, ...data.content]);
      } else {
        setAllMedia(() => [...data.content]);
      }
    }
  }, [status, data]);

  const renderLoadingCards = () => {
    const items = Array.from({ length: filter.size }, (_, index) => index);

    return (
      <div className="mt-8 grid auto-rows-fr gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {items.map((item) => (
          <div key={`media-loading-card-${item}`}>
            <Skeleton active />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col mx-[32px] mb-[17px] h-full">
      <PostsFilter />
      <div
        id="mainScrollableContent"
        className="overflow-auto rounded-2xl shadow-xl border flex-1"
      >
        <div className="p-8">
          <InfiniteScroll
            dataLength={allMedia.length}
            next={fetchMoreMedia}
            hasMore={status === Status.success && !data.last}
            loader={renderLoadingCards()}
            scrollableTarget="mainScrollableContent"
          >
            <div className="grid auto-rows-fr gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {allMedia.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  onTogglePinning={() => handleTogglePinning(media.id)}
                  onToggleVisibility={() => handleToggleVisibility(media.id)}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Moderation;
