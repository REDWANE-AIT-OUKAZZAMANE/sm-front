import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { ProducerProps, Status } from 'async-states';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { app } from '../../../app';
import { API } from '../../../../api';
import MediaCard from './MediaCard';
import paths from '../../../../api/paths';
import { Media, Page, QueryParams } from '../../../types';
import { togglePinMediaProducer } from '../../data/producers/pinnedPostProducer';
import PostsFilter from './FilterForm';
import './styles.scss';
import { defaultPostsQueryParams } from '../../../utils/constants';
import { MediaVisibilityProducer } from '../../data/producers/MediaVisibilityProducer';

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

function Moderation() {
  const { state, run: runSearchMedia } = app.media.search
    .inject(searchMedia)
    .useAsyncState();
  const { status, data } = state;
  const { state: toggleState, run: runTogglePin } = app.media.toggle_media
    .inject(togglePinMediaProducer)
    .useAsyncState();

  const location = useLocation();
  const { state: VisibilitytoggleState, run: runVisibilityToggle } =
    app.media.media_visibility.inject(MediaVisibilityProducer).useAsyncState();

  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [filter, setFilter] = useState(defaultPostsQueryParams);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  useEffect(() => {
    const parsedQueryParams = queryString.parse(location.search.slice(1), {
      parseBooleans: true,
    });

    setFilter({
      ...defaultPostsQueryParams,
      ...parsedQueryParams,
      page: 0,
    });
    setShouldRefetch(true);
  }, [location]);

  const handleTogglePinning = (mediaId: string) => {
    runTogglePin(mediaId);
  };

  useEffect(() => {
    if (toggleState.status === Status.success) {
      setShouldRefetch(true);
      runSearchMedia({
        ...filter,
        size: filter.size * (filter.page + 1),
        page: 0,
      });
    }
  }, [toggleState]);

  const handleToggleVisibility = (mediaId: string) => {
    runVisibilityToggle(mediaId);
  };

  useEffect(() => {
    if (
      toggleState.status === Status.success ||
      VisibilitytoggleState.status === Status.success
    ) {
      setShouldRefetch(true);
      runSearchMedia({
        ...filter,
        size: filter.size * (filter.page + 1),
        page: 0,
      });
    }
  }, [VisibilitytoggleState.status, toggleState]);

  const fetchMoreMedia = () => {
    setShouldRefetch(false);
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    runSearchMedia(filter);
  }, [runSearchMedia, filter]);

  useEffect(() => {
    if (status === Status.success) {
      // when refreshing we dont need previous data cause it will get refetched
      if (!shouldRefetch) {
        setAllMedia((prev) => [...prev, ...data.content]);
      } else {
        setAllMedia(() => [...data.content]);
        setShouldRefetch(false);
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
        className="media-cards overflow-auto rounded-2xl shadow-xl border flex-1 h-full"
      >
        <div className="p-8">
          <InfiniteScroll
            dataLength={allMedia.length}
            next={fetchMoreMedia}
            hasMore={status === Status.success && !data?.last}
            loader={renderLoadingCards()}
            scrollableTarget="mainScrollableContent"
          >
            <div className="grid auto-rows-fr gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {allMedia.length ? (
                allMedia.map((media) => (
                  <MediaCard
                    key={media.id}
                    media={media}
                    onTogglePinning={() => handleTogglePinning(media.id)}
                    onToggleVisibility={() => handleToggleVisibility(media.id)}
                  />
                ))
              ) : (
                <div className="text-center text-3xl">No media found</div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Moderation;
