import { render, screen } from '@testing-library/react';

import { testIds } from '../../../../constants';
import TextCard from '../../../../../app/landing/components/CardsGrid/Card';
import {
  contentTypes,
  mediaTypes,
  socialMediaSources,
} from '../../../../../app/utils/constants';
import { mockMediaData } from './data';

describe('TextCard', () => {
  it('should render the Static TextCard component with valid data', () => {
    render(
      <TextCard
        media={mockMediaData}
        maxCards={4}
        delay={0}
        type={contentTypes.STATIC}
      />
    );

    const cardContainer = screen.getByTestId(testIds.landing.Card.container);
    expect(cardContainer).toBeInTheDocument();
    const username = screen.getByText('testUser');
    expect(username).toBeInTheDocument();
    const timestamp = screen.getByText('19 Jul 2023');
    expect(timestamp).toBeInTheDocument();
    const icon = screen.getByTestId(testIds.landing.Card.socialIcon);
    expect(icon).toBeInTheDocument();
    const backgroundImg = screen.getByTestId(
      testIds.landing.Card.backgroundImage
    );
    expect(backgroundImg).toBeInTheDocument();
  });

  it('should render the Animated TextCard component with valid data', () => {
    render(
      <TextCard
        media={mockMediaData}
        maxCards={4}
        delay={0}
        type={contentTypes.ANIMATED}
      />
    );

    const cardContainer = screen.getByTestId(testIds.landing.Card.container);
    expect(cardContainer).toBeInTheDocument();
    const textContent = screen.getByText('Example text content');
    expect(textContent).toBeInTheDocument();
    const username = screen.getByText('testUser');
    expect(username).toBeInTheDocument();
    const timestamp = screen.getByText('19 Jul 2023');
    expect(timestamp).toBeInTheDocument();
    const icon = screen.getByTestId(testIds.landing.Card.socialIcon);
    expect(icon).toBeInTheDocument();
    const backgroundImg = screen.getByTestId(
      testIds.landing.Card.backgroundImage
    );
    expect(backgroundImg).toBeInTheDocument();
  });

  it('should render the pinned icon for pinned media', () => {
    const pinnedMediaData = { ...mockMediaData, pinned: true };
    render(
      <TextCard media={pinnedMediaData} type="IMAGE" maxCards={4} delay={0} />
    );

    const pinnedIcon = screen.getByTestId(testIds.landing.Card.pinnedIcon);
    expect(pinnedIcon).toBeInTheDocument();
  });

  it('should render the correct media type based on the source and type', () => {
    const youtubeMediaData = {
      ...mockMediaData,
      source: socialMediaSources.YOUTUBE,
      type: mediaTypes.VIDEO,
    };
    render(
      <TextCard
        media={youtubeMediaData}
        type={contentTypes.ANIMATED}
        maxCards={4}
        delay={0}
      />
    );
    const youtubeVideo = screen.getByTestId(testIds.landing.Card.youtubeVideo);
    expect(youtubeVideo).toBeInTheDocument();

    const videoMediaData = {
      ...mockMediaData,
      type: mediaTypes.VIDEO,
      url: 'test-video-url',
    };
    render(
      <TextCard media={videoMediaData} type="ANIMATED" maxCards={4} delay={0} />
    );
    const video = screen.getByTestId(testIds.landing.Card.video);
    expect(video).toBeInTheDocument();

    const imageMediaData = {
      ...mockMediaData,
      type: mediaTypes.IMAGE,
      url: 'test-image-url',
    };
    render(
      <TextCard media={imageMediaData} type="ANIMATED" maxCards={4} delay={0} />
    );
    const backgroundImage = screen.getByTestId(
      testIds.landing.Card.backgroundImage
    );
    expect(backgroundImage).toBeInTheDocument();
  });

  it('should display the text content for media that is not just hashtags', () => {
    render(
      <TextCard
        media={mockMediaData}
        maxCards={4}
        delay={0}
        type={contentTypes.ANIMATED}
      />
    );

    const textContent = screen.getByText('Example text content');
    expect(textContent).toBeInTheDocument();
  });

  it('should not display the text content for media that is only hashtags', () => {
    const hashtagsOnlyMediaData = {
      ...mockMediaData,
      textContainsOnlyHashtags: true,
    };
    render(
      <TextCard
        media={hashtagsOnlyMediaData}
        type="ANIMATED"
        maxCards={4}
        delay={0}
      />
    );
    const textContent = screen.queryByText('Example text content');
    expect(textContent).not.toBeInTheDocument();
  });
});
