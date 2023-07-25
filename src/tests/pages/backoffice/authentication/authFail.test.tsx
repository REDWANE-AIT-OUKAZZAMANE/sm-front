import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Backofiice from '../../../../app/backoffice';
import { testIds } from '../../../constants';

const restFailureHandlers = [
  rest.get('/api/v1/auth/current', (req, res, ctx) =>
    res(ctx.status(401), ctx.json(null))
  ),
];

const server = setupServer(...restFailureHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('authentication fail', () => {
  it('renders login page when initial authentication check fails', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Backofiice />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.backofficeLoader)
    );

    expect(screen.getByTestId(testIds.loginPage)).toBeInTheDocument();
  });
});
