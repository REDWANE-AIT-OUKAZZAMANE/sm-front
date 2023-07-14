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
import { errorCodeToMessage } from '../../../../api/errorCodeToMessage';
import { testIds } from '../../../../tests/constants';
import { openErrorToast } from '../../utils/notifications';

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
  const { state, runc: runcSearchMedia } = app.media.search
    .inject(searchMedia)
    .useAsyncState();
  const { status, data } = state;
  const { runc: runcTogglePin } = app.media.toggle_media
    .inject(togglePinMediaProducer)
    .useAsyncState();

  const location = useLocation();
  const { runc: runcVisibilityToggle } = app.media.media_visibility
    .inject(MediaVisibilityProducer)
    .useAsyncState();

  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [filter, setFilter] = useState(defaultPostsQueryParams);

  useEffect(() => {
    const parsedQueryParams = queryString.parse(location.search.slice(1), {
      parseBooleans: true,
    });

    setFilter({
      ...defaultPostsQueryParams,
      ...parsedQueryParams,
      page: 0,
    });
  }, [location]);

  const onSearchSuccess = (result) => {
    const successData = result.data;
    const { page: filterPage } = result.props.args[0];

    if (filterPage !== 0) {
      setAllMedia((prev) => [...prev, ...successData.content]);
    } else {
      setAllMedia(() => [...successData.content]);
    }
  };

  const onPinOrVisibilityToggleError = (result) => {
    const { data: toggleData } = result as any;
    openErrorToast(errorCodeToMessage(toggleData.response?.data?.code));
  };

  const onPinOrVisibilityToggleSuccess = () => {
    runcSearchMedia({
      onSuccess: onSearchSuccess,
      args: [
        {
          ...filter,
          size: filter.size * (filter.page + 1),
          page: 0,
        },
      ],
    });
  };

  const handleTogglePinning = (mediaId: string) => {
    runcTogglePin({
      onSuccess: onPinOrVisibilityToggleSuccess,
      onError: onPinOrVisibilityToggleError,
      args: [mediaId],
    });
  };

  const handleToggleVisibility = (mediaId: string) => {
    runcVisibilityToggle({
      onSuccess: onPinOrVisibilityToggleSuccess,
      onError: onPinOrVisibilityToggleError,
      args: [mediaId],
    });
  };

  const fetchMoreMedia = () => {
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    runcSearchMedia({
      onSuccess: onSearchSuccess,
      args: [filter],
    });
  }, [runcSearchMedia, filter]);

  const renderLoadingCards = () => {
    const items = Array.from({ length: filter.size }, (_, index) => index);

    return (
      <div className="mt-8 grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
        {items.map((item) => (
          <div key={`media-loading-card-${item}`}>
            <Skeleton active />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-[32px] mb-[17px] flex h-full flex-col">
      <PostsFilter />
      <div
        data-testid={testIds.moderation.moderationList}
        className="media-cards__outer h-full overflow-auto rounded-2xl border shadow-xl"
      >
        <div
          id="mainScrollableContent"
          className="media-cards__inner custom-scrollbar h-full  flex-1 overflow-auto"
        >
          <InfiniteScroll
            dataLength={allMedia.length}
            next={fetchMoreMedia}
            hasMore={status === Status.success && !data?.last}
            loader={renderLoadingCards()}
            scrollableTarget="mainScrollableContent"
          >
            <div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
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
                <div
                  data-testid={testIds.moderation.no_media}
                  className="text-center text-3xl"
                >
                  No media found
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Moderation;
