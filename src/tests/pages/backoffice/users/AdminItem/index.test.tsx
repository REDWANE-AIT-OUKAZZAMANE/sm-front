import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { notification } from 'antd';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { ADMIN } from './data';
import AdminItem from '../../../../../app/backoffice/pages/Settings/AdminManagement/AdminItem';
import { testIds } from '../../../../constants';
import paths from '../../../../../api/paths';

const runGetAdmins = vi.fn();

const server = setupServer(
  rest.delete(`/api${paths.DELETE_ADMIN(':id')}`, (req, res, ctx) =>
    res(ctx.status(200))
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

beforeEach(() => {
  render(<AdminItem admin={ADMIN} runGetAdmins={runGetAdmins} />);
});
describe('AdminItem', () => {
  it('should render admin details correctly', () => {
    const checkbox = screen.getByTestId(testIds.users.userItem.checkbox);
    const switchInput = screen.getByTestId(testIds.users.userItem.switch);

    expect(checkbox).toBeInTheDocument();
    expect(switchInput).toBeInTheDocument();
    expect(
      screen.getByText(`${ADMIN.firstName} ${ADMIN.lastName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN.email)).toBeInTheDocument();
    expect(
      screen.getByText(dayjs(ADMIN.createdAt).format('MMMM D, YYYY'))
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN.authorities[0].name)).toBeInTheDocument();
  });

  it('opens dropdown menu when dots button is clicked', () => {
    const dotsButton = screen.getByTestId(testIds.users.userItem.dots);

    expect(
      screen.queryByTestId(testIds.users.userItem.edit)
    ).not.toBeInTheDocument();

    fireEvent.click(dotsButton);

    waitFor(() => {
      expect(
        screen.queryByTestId(testIds.users.userItem.edit)
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(testIds.users.userItem.delete)
      ).toBeInTheDocument();
    });
  });

  it('should close dropdown on outside click', async () => {
    const dropDownButton = screen.getByTestId(testIds.users.userItem.dots);

    fireEvent.click(dropDownButton);

    const outside = screen.getByTestId(testIds.users.userItem.checkbox);

    expect(outside).toBeInTheDocument();

    fireEvent.click(outside);

    waitFor(() => {
      expect(
        screen.queryByTestId(testIds.users.userItem.edit)
      ).not.toBeInTheDocument();
    });
  });

  it('toggles the switch when clicked', () => {
    const switchElement = screen.getByTestId(testIds.users.userItem.switch);
    expect(switchElement).toBeChecked();
    fireEvent.click(switchElement);

    waitFor(() => {
      expect(switchElement).not.toBeChecked();
    });
  });

  it('should bot delete admin and not  call runGetAdmins on error', async () => {
    server.use(
      rest.delete(`/api${paths.DELETE_ADMIN(':id')}`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    const dropDownButton = screen.getByTestId(testIds.users.userItem.dots);

    fireEvent.click(dropDownButton);
    const deleteButton = screen.getByTestId(testIds.users.userItem.delete);

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.getByTestId(testIds.modalContainer)).toBeInTheDocument();

    const confirmButton = screen.getByTestId(testIds.modalConfirmation);

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: `Error`,
        description: 'Failed to delete admin',
        placement: 'bottomRight',
        icon: expect.any(Object),
      });
      expect(runGetAdmins).not.toHaveBeenCalled();
    });
  });

  it('should delete admin and call runGetAdmins', async () => {
    const dropDownButton = screen.getByTestId(testIds.users.userItem.dots);

    fireEvent.click(dropDownButton);
    const deleteButton = screen.getByTestId(testIds.users.userItem.delete);

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.getByTestId(testIds.modalContainer)).toBeInTheDocument();

    const confirmButton = screen.getByTestId(testIds.modalConfirmation);

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: `Success`,
        description: 'The admin has been successfully deleted',
        placement: 'bottomRight',
        icon: expect.any(Object),
      });
      expect(runGetAdmins).toHaveBeenCalled();
    });
  });
});
