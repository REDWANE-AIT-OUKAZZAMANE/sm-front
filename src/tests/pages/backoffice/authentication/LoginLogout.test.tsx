import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Backofiice from '../../../../app/backoffice';
import { testIds } from '../../../constants';
import { SUCCESS_USER } from './data';

const restSuccessHandler = [
  // mocking current api, if no cookie is set returns 403 forbidden and deny access (this is an over simplification since we are only checking if a cookie in general is set and since we don't work with cookies except for authentication)
  rest.get('/api/v1/auth/current', (req, res, ctx) => {
    if (document.cookie) {
      return res(ctx.status(200), ctx.json(SUCCESS_USER));
    }
    return res(ctx.status(403), ctx.json(null));
  }),

  // mocking login api and checking correct credentials
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    const { email, password } = req.body as any;
    if (email === 'Jame.doe@email.com' && password === 'ValidP@ssword1') {
      document.cookie = 'auth-token=123';
      return res(ctx.status(200), ctx.json(null));
    }

    return res(ctx.status(403), ctx.json(null));
  }),

  // mocking logout api, here we clear the cookies from the document object so can successfully log the user out in the testing (/current will return 403)
  rest.post('/api/v1/auth/logout', (req, res, ctx) => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    return res(ctx.status(200), ctx.json(null));
  }),
];

const server = setupServer(...restSuccessHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('authentication login and logout', () => {
  it('logs in when correct creditentials are entered and logs out when logout button and confirmation are pressed', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Backofiice />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.backofficeLoader)
    );

    expect(screen.getByTestId(testIds.loginPage)).toBeInTheDocument();

    const email = screen.getByTestId(testIds.auth.email) as HTMLInputElement;
    expect(email).toBeInTheDocument();
    fireEvent.change(email, { target: { value: 'Jame.doe@email.com' } });
    expect(email.value).toBe('Jame.doe@email.com');

    const password = screen.getByTestId(
      testIds.auth.password
    ) as HTMLInputElement;
    expect(password).toBeInTheDocument();
    fireEvent.change(password, { target: { value: 'ValidP@ssword1' } });
    expect(password.value).toBe('ValidP@ssword1');

    const submit = screen.getByTestId(testIds.auth.submitBtn);

    await act(async () => {
      fireEvent.click(submit);
    });

    // if the login is successful the Header containing the logout button should be present
    const logout = screen.getByTestId(testIds.logoutBtn);
    expect(logout).toBeInTheDocument();
    fireEvent.click(logout);

    const modalConfirmation = screen.getByTestId(testIds.modalConfirmation);
    expect(modalConfirmation).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(modalConfirmation);
    });

    await waitFor(() => {
      expect(screen.getByTestId(testIds.loginPage)).toBeInTheDocument();
    });
  });
});
