import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Backofiice from '../../../../app/backoffice';
import { testIds } from '../../../constants';
import { SUCCESS_USER } from './data';

const restSuccessHandler = [
  rest.get('http://localhost:3000/api/v1/auth/current', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(SUCCESS_USER))
  ),
];

const server = setupServer(...restSuccessHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('authentication success', () => {
  it('renders layout component and correct content if initial authentication check succeeds', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Backofiice />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.backofficeLoader)
    );
    const sidebar = screen.getByTestId(testIds.sidemenu.container);
    expect(sidebar).toBeInTheDocument();

    const { getByText } = within(
      screen.getByTestId(testIds.sidemenu.userEmail)
    );
    expect(getByText(SUCCESS_USER.email)).toBeInTheDocument();
  });
});
