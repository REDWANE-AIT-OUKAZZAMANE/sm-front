import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import { rest } from 'msw';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import AnnouncementForm from '../../../../../app/backoffice/pages/Settings/GeneralSettings/AnnouncementForm';
import { testIds } from '../../../../constants';
import { handlers } from '../../../../server-handlers';
import paths from '../../../../../api/paths';
import {
  AnnouncementAddCommand,
  AnnouncementUpdateCommand,
} from '../../../../../app/backoffice/data/api';

const server = setupServer(...handlers);
const user: UserEvent = userEvent.setup();
let closeForm;
let runGetAnnouncements;
let setLoading;
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

afterAll(() => server.close());

export const setDates = async (
  startDateInput: HTMLElement,
  endDateInput: HTMLElement,
  start: Date,
  end: Date
) => {
  await user.click(startDateInput);
  await user.click(screen.getAllByTitle(start.toISOString().slice(0, 10))[0]);
  await user.click(screen.getAllByText('OK')[0]);

  await user.click(endDateInput);
  await user.click(screen.getAllByTitle(end.toISOString().slice(0, 10))[1]);
  await user.click(screen.getAllByText('OK')[1]);
};
describe('Announcement Form and adding', () => {
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

    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    await setDates(startDateInput, endDateInput, currentDate, currentDate);

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

    const startDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.startDateInput
    );
    const endDateInput = screen.getByTestId(
      testIds.announcements.announcementForm.endDateInput
    );
    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    await setDates(endDateInput, startDateInput, endDate, startDate);

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

    await setDates(startDateInput, endDateInput, startDate, endDate);

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

    await setDates(startDateInput, endDateInput, startDate, endDate);

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
describe('Announcement Form Update', () => {
  beforeEach(() => {
    closeForm = vi.fn();
    runGetAnnouncements = vi.fn();
    setLoading = vi.fn();
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 1);
    endDate.setDate(currentDate.getDate() + 2);
    render(
      <AnnouncementForm
        closeForm={closeForm}
        runGetAnnouncements={runGetAnnouncements}
        setLoading={setLoading}
        edit
        annoucementData={{
          title: 'title to be updated',
          description:
            'Test this is a vlid long announcement for testing to be updated',
          startDate,
          endDate,
        }}
      />
    );
  });

  it('should update valid announcement call runGetannouncement and close the form', async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 2);
    endDate.setDate(currentDate.getDate() + 3);

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });

    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
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
    await user.click(endDateInput);
    await user.click(
      screen.getAllByTitle(endDate.toISOString().slice(0, 10))[0]
    );
    await user.click(screen.getAllByText('OK')[0]);

    fireEvent.click(submitButton);

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: 'Success',
        description: 'The announcement has been successfully updated',
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
      rest.patch(`/api${paths.ANNOUNCEMENT_UPDATE(':id')}`, (req, res, ctx) => {
        const announcementCommand = req.body as AnnouncementUpdateCommand;

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

    const titleInput = screen.getByTestId(
      testIds.announcements.announcementForm.titleInput
    );
    const descriptionInput = screen.getByTestId(
      testIds.announcements.announcementForm.descriptionInput
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
