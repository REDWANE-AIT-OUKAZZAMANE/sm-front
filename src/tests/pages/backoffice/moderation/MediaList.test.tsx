import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Backoffice from '../../../../app/backoffice';
import Moderation from '../../../../app/backoffice/pages/Moderation';
import { MEDIA_DATA, MEDIA_FILTER_KEYWORD } from './data';
import { testIds } from '../../../constants';
import { SUCCESS_USER } from '../authentication/data';

const restMediadataHandler = [
  rest.get('http://localhost:3000/api/v1/media', (req, res, ctx) => {
    if (req.url.searchParams.get('q') === 'test') {
      return res(ctx.status(200), ctx.json(MEDIA_FILTER_KEYWORD));
    }
    return res(ctx.status(200), ctx.json(MEDIA_DATA));
  }),

  rest.get('http://localhost:3000/api/v1/auth/current', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(SUCCESS_USER))
  ),
];

const server = setupServer(...restMediadataHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('moderation page', () => {
  it('displays list of fetched media with correct number of posts', async () => {
    render(
      <BrowserRouter>
        <Moderation />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.moderation.no_media)
    );
    const mediaCards = screen.getAllByTestId(testIds.moderation.mediaCard);
    expect(mediaCards.length).toEqual(MEDIA_DATA.content.length);
  });

  it('displays list of filtered media after filtering with keyword', async () => {
    render(
      <MemoryRouter initialEntries={['/admin/moderate']}>
        <Backoffice />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.backofficeLoader)
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.moderation.no_media)
    );

    const search = screen.getByTestId(
      testIds.moderation.FilterForm.searchInput
    ) as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'test' } });
    expect(search.value).toBe('test');

    const submit = screen.getByTestId(
      testIds.moderation.FilterForm.submitButton
    );
    await act(async () => {
      fireEvent.click(submit);
    });

    const mediaCards = screen.getAllByTestId(testIds.moderation.mediaCard);
    expect(mediaCards.length).toEqual(MEDIA_FILTER_KEYWORD.content.length);
  });
});
