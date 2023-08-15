import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

import AdminManagement from '../../../../../app/backoffice/pages/Settings/AdminManagement/AdminList';
import { testIds } from '../../../../constants';
import { handlers } from '../../../../server-handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const user = userEvent.setup();

describe('admin form', () => {
  beforeEach(async () => {
    render(
      <BrowserRouter>
        <AdminManagement />
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.users.userListSpinner)
    );
  });

  it('displays admin form when add button is clicked', async () => {
    const addAdminButton = screen.getByTestId(
      testIds.users.FilterForm.addButton
    );
    fireEvent.click(addAdminButton);

    const userForm = screen.getByTestId(testIds.users.userForm.container);
    expect(userForm).toBeInTheDocument();
  });

  it('displays correct components in admin form', async () => {
    const addAdminButton = screen.getByTestId(
      testIds.users.FilterForm.addButton
    );
    fireEvent.click(addAdminButton);

    const userForm = screen.getByTestId(testIds.users.userForm.container);
    expect(userForm).toBeInTheDocument();

    const firstnameInput = screen.getByTestId(
      testIds.users.userForm.firstnameInput
    );
    expect(firstnameInput).toBeInTheDocument();

    const lastnameInput = screen.getByTestId(
      testIds.users.userForm.lastnameInput
    );
    expect(lastnameInput).toBeInTheDocument();

    const emailInput = screen.getByTestId(testIds.users.userForm.emailInput);
    expect(emailInput).toBeInTheDocument();

    const roleSelect = screen.getByTestId(testIds.users.userForm.roleSelect);
    expect(roleSelect).toBeInTheDocument();
  });

  it('displays validation error messages', async () => {
    const addAdminButton = screen.getByTestId(
      testIds.users.FilterForm.addButton
    );
    fireEvent.click(addAdminButton);

    const firstnameInput = screen.getByTestId(
      testIds.users.userForm.firstnameInput
    ) as HTMLInputElement;
    fireEvent.change(firstnameInput, { target: { value: 'Tesxtwith@' } });

    const lastnameInput = screen.getByTestId(
      testIds.users.userForm.lastnameInput
    );
    fireEvent.change(lastnameInput, { target: { value: 'lastname' } });

    const emailInput = screen.getByTestId(testIds.users.userForm.emailInput);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const formSubmit = screen.getByTestId(testIds.users.userForm.submitButton);
    fireEvent.click(formSubmit);

    await waitFor(() => {
      expect(
        screen.getAllByText('This field is required')[0]
      ).toBeInTheDocument();

      expect(
        screen.getAllByText(
          'Only alpha-numeric characters, dashes and aposthrophes are allowed'
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('Please enter a valid email address!')[0]
      ).toBeInTheDocument();
    });
  });

  it('displays success toast when request to add new user succeeds', async () => {
    const addAdminButton = screen.getByTestId(
      testIds.users.FilterForm.addButton
    );
    fireEvent.click(addAdminButton);

    const firstnameInput = screen.getByTestId(
      testIds.users.userForm.firstnameInput
    ) as HTMLInputElement;
    fireEvent.change(firstnameInput, { target: { value: 'firstname' } });

    const lastnameInput = screen.getByTestId(
      testIds.users.userForm.lastnameInput
    );
    fireEvent.change(lastnameInput, { target: { value: 'lastname' } });

    const emailInput = screen.getByTestId(testIds.users.userForm.emailInput);
    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });

    const roleSelect = screen.getAllByRole('combobox')[1];
    await user.click(roleSelect);
    const admin = screen.getByText('Admin');
    await user.click(admin);

    const formSubmit = screen.getByTestId(testIds.users.userForm.submitButton);
    await act(async () => {
      fireEvent.click(formSubmit);
    });

    waitFor(() =>
      expect(
        screen.getByText('The admin has been successfully added')
      ).toBeInTheDocument()
    );
  });

  it('displays success toast with correct message when request to add edit user succeeds', async () => {
    const dots = screen.getAllByTestId(testIds.users.userItem.dots)[0];

    fireEvent.click(dots);

    const editButton = screen.getByTestId(testIds.users.userItem.edit);

    fireEvent.click(editButton);

    const lastnameInput = screen.getByTestId(
      testIds.users.userForm.lastnameInput
    );
    fireEvent.change(lastnameInput, { target: { value: 'lastname' } });

    const roleSelect = screen.getAllByRole('combobox')[1];
    await user.click(roleSelect);
    const admin = screen.getByText('Admin');
    await user.click(admin);

    const formSubmit = screen.getByTestId(testIds.users.userForm.submitButton);
    await act(async () => {
      fireEvent.click(formSubmit);
    });

    waitFor(() =>
      expect(
        screen.getByText('The admin has been successfully updated')
      ).toBeInTheDocument()
    );
  });
});
