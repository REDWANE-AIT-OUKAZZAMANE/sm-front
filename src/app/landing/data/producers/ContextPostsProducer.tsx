import { ProducerProps } from 'react-async-states';

import { Media } from '../../../types';
import { mediaPosts } from '../sources/PostsSource';
import { displayedPostsFetchType } from '../../../utils/constants';

type PostSourceResponse = {
  postssource: Media[];
  pinnedPost: Media | null;
};
export const fetchDisplayedPostsSource = (
  props: ProducerProps<PostSourceResponse, Error, never, [string, Media | null]>
) => {
  const postsState = mediaPosts.getState();
  const posts = postsState.data as Media[];
  let postsSource: Media[] = [];
  let pinnedPost: Media | null = null;

  if (props.args[0] === displayedPostsFetchType.togglePin) {
    const toggledMedia = props.args[1] as Media;

    if (toggledMedia.pinned) {
      postsSource = posts.filter((media) => media.id !== toggledMedia.id);
      pinnedPost = toggledMedia;
    } else {
      pinnedPost = null;
      postsSource = posts.map((media) => ({
        ...media,
        pinned: false,
      }));
    }
  } else if (props.args[0] === displayedPostsFetchType.toggleHide) {
    const toggledMedia = props.args[1] as Media;
    const currentPostsSource = props.getState().data as PostSourceResponse;
    if (
      toggledMedia.hidden &&
      currentPostsSource.pinnedPost &&
      toggledMedia.id === currentPostsSource.pinnedPost.id
    ) {
      pinnedPost = null;
    } else {
      pinnedPost = currentPostsSource.pinnedPost;
    }
    postsSource = posts.map((media) =>
      media.id === toggledMedia.id
        ? { ...media, hidden: toggledMedia.hidden }
        : media
    );
  } else if (props.args[0] === displayedPostsFetchType.initialFetch) {
    pinnedPost = posts.find((post) => post.pinned) || null;
    postsSource = posts.filter((media) => !media.pinned);
  }

  const postsSourceResponse: PostSourceResponse = {
    postssource: postsSource,
    pinnedPost,
  };
  return postsSourceResponse;
};
