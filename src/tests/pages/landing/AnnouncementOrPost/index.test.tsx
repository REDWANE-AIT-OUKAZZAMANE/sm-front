import { render, screen, act, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import AnnoucementOrPost from '../../../../app/landing/components/AnnouncementOrPost';
import { AnimationContextProvider } from './mocks';
import { testIds } from '../../../constants';
import { closestAnnouncement } from '../../../../app/landing/data/sources/AnnouncementsSource';
import { handlers } from '../../../server-handlers';
import { CurrentAnnouncement } from './data';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

vi.mock('../../../../app/landing/contexts/animationContext', async () => {
  const aa = vi.importActual('./mocks');
  return aa;
});
describe('AnnoucementOrPost', () => {
  it('should render the Card component when showAnnouncement is false', async () => {
    act(() => {
      render(
        <AnimationContextProvider>
          <AnnoucementOrPost />
        </AnimationContextProvider>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.landing.Card.container)
      ).toBeInTheDocument();
    });
  });

  it('should render the Announcement component when announcement has already begun', async () => {
    act(() => {
      render(
        <AnimationContextProvider>
          <AnnoucementOrPost />
        </AnimationContextProvider>
      );
    });
    await act(async () => {
      closestAnnouncement.run();
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(
          testIds.landing.AnnouncementOrPost.announcementContainer
        )
      ).toBeInTheDocument();

      expect(screen.getByText(CurrentAnnouncement.title)).toBeInTheDocument();

      expect(
        screen.getByText(CurrentAnnouncement.description)
      ).toBeInTheDocument();
    });
  });

  it('should render the Announcement component after 2 seconds', async () => {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setSeconds(currentDate.getSeconds() + 2);

    server.use(
      rest.get('/api/v1/announcements', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            content: [{ ...CurrentAnnouncement, startDate }],
          })
        )
      )
    );

    act(() => {
      render(
        <AnimationContextProvider>
          <AnnoucementOrPost />
        </AnimationContextProvider>
      );
    });

    await act(async () => {
      closestAnnouncement.run();
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.landing.Card.container)
      ).toBeInTheDocument();
    });

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(
          testIds.landing.AnnouncementOrPost.announcementContainer
        )
      ).toBeInTheDocument();

      expect(screen.getByText(CurrentAnnouncement.title)).toBeInTheDocument();

      expect(
        screen.getByText(CurrentAnnouncement.description)
      ).toBeInTheDocument();
    });
  });

  it('should remove the Announcement component after 2 seconds', async () => {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setSeconds(currentDate.getSeconds() + 2);

    server.use(
      rest.get('/api/v1/announcements', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            content: [{ ...CurrentAnnouncement, endDate }],
          })
        )
      )
    );

    act(() => {
      render(
        <AnimationContextProvider>
          <AnnoucementOrPost />
        </AnimationContextProvider>
      );
    });

    await act(async () => {
      closestAnnouncement.run();
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(
          testIds.landing.AnnouncementOrPost.announcementContainer
        )
      ).toBeInTheDocument();
    });

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(
          testIds.landing.AnnouncementOrPost.announcementContainer
        )
      ).not.toBeInTheDocument();

      expect(
        screen.getByTestId(testIds.landing.Card.container)
      ).toBeInTheDocument();
    });
  });
});
