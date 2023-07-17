import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import { rest } from 'msw';

import AnnouncementForm from '../../../../../app/backoffice/pages/Settings/GeneralSettings/AnnouncementForm';
import { testIds } from '../../../../constants';
import { handlers } from '../../../../server-handlers';
import paths from '../../../../../api/paths';
import { AnnouncementAddCommand } from '../../../../../app/backoffice/data/api';

const server = setupServer(...handlers);
let closeForm;
let runGetAnnouncements;
let setLoading;
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
beforeEach(() => {
  closeForm = vi.fn();
  runGetAnnouncements = vi.fn();
  setLoading = vi.fn();

  render(
    <AnnouncementForm
      closeForm={closeForm}
      runGetAnnouncements={runGetAnnouncements}
      setLoading={setLoading}
    />
  );
});
afterAll(() => server.close());

const setDates = async (user, startDateInput, endDateInput, start, end) => {
  await user.click(startDateInput);
  await user.click(screen.getAllByTitle(start.toISOString().slice(0, 10))[0]);
  await user.click(screen.getAllByText('OK')[0]);

  await user.click(endDateInput);
  await user.click(screen.getAllByTitle(end.toISOString().slice(0, 10))[1]);
  await user.click(screen.getAllByText('OK')[1]);
};
describe('Announcemnt Form', () => {
  const user = userEvent.setup();
  it('form inputs and buttons are rendered', () => {
    // Input fields
    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
    );
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();

    // Buttons
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );
    const cancelButton = screen.getByTestId(
      testIds.announcements.announcementForm.closeButton
    );

    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('should display error messages for invalid title and description', async () => {
    // Input fields
    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
    );
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });

    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test ' },
    });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getAllByText(
          'Title must contain at least 5 characters, only alpha-numeric characters, dashes and aposthrophes are allowed'
        )[0]
      ).toBeInTheDocument();

      expect(
        screen.getAllByText(
          'Description must contain a minimum of 25 characters'
        )[0]
      ).toBeInTheDocument();
    });
  });
  it('should display error messages for old start and end dates ', async () => {
    const currentDate = new Date();

    // Input fields
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    await setDates(
      user,
      startDateInput,
      endDateInput,
      currentDate,
      currentDate
    );

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getAllByText('Start date must be in the future.')[0]
      ).toBeInTheDocument();

      expect(
        screen.getAllByText('End date must be in the future.')[0]
      ).toBeInTheDocument();
    });
  });
  it('should display error messages for endDate after startDate ', async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 2);
    endDate.setDate(currentDate.getDate() + 1);
    // Input fields
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    await setDates(user, endDateInput, startDateInput, endDate, startDate);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getAllByText('End date must be after start date.')[0]
      ).toBeInTheDocument();
    });
  });
  it('ednDate before startDate should  be disabled ', async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 2);
    endDate.setDate(currentDate.getDate() + 1);

    // Input fields
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );

    await user.click(startDateInput);
    await user.click(
      screen.getAllByTitle(startDate.toISOString().slice(0, 10))[0]
    );
    await user.click(screen.getAllByText('OK')[0]);

    await user.click(endDateInput);
    expect(
      screen.getAllByTitle(endDate.toISOString().slice(0, 10))[1]
    ).toHaveClass('ant-picker-cell-disabled ');
  });
  it('should add valid announcement call runGetannouncement and close the form', async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 1);
    endDate.setDate(currentDate.getDate() + 2);

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });

    // Input fields
    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
    );
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );

    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    fireEvent.change(titleInput, { target: { value: 'Closing Keynote' } });

    fireEvent.change(descriptionInput, {
      target: {
        value: 'Test this is a vlid long announcement for testing',
      },
    });

    await setDates(user, startDateInput, endDateInput, startDate, endDate);

    fireEvent.click(submitButton);

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: 'Success',
        description: 'The announcement has been successfully added',
        duration: 3,
        placement: 'bottomRight',
        icon: expect.any(Object),
      });

      expect(runGetAnnouncements).toHaveBeenCalled();
      expect(setLoading).toHaveBeenCalled();
      expect(closeForm).toHaveBeenCalled();
    });
  });
  it('should show notification error on no success response', async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 1);
    endDate.setDate(currentDate.getDate() + 2);

    server.use(
      rest.post(`/api${paths.ANNOUNCEMENTS_LIST}`, (req, res, ctx) => {
        const announcementCommand = req.body as AnnouncementAddCommand;

        return res(
          ctx.status(403),
          ctx.json({
            id: '1',
            title: announcementCommand.title,
            description: announcementCommand.description,
            startDate: announcementCommand.startDate,
            endDate: announcementCommand.endDate,
          })
        );
      })
    );

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });

    // Input fields
    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
    );
    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );

    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    fireEvent.change(titleInput, { target: { value: 'Closing Keynote' } });

    fireEvent.change(descriptionInput, {
      target: {
        value: 'Test this is a vlid long announcement for testing',
      },
    });

    await setDates(user, startDateInput, endDateInput, startDate, endDate);

    fireEvent.click(submitButton);

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: 'Error',
        description: 'Unknown error occured',
        duration: 3,
        placement: 'bottomRight',
        icon: expect.any(Object),
      });
    });
  });
});
