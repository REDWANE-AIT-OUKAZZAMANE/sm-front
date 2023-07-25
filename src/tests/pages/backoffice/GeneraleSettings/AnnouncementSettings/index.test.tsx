import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { setupServer } from 'msw//node';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';

import AnnouncementsSettings from '../../../../../app/backoffice/pages/Settings/GeneralSettings/AnnouncementsSettings';
import { handlers } from '../../../../server-handlers';
import { testIds } from '../../../../constants';
import paths from '../../../../../api/paths';
import { ANNCOUNCEMENT_LIST } from './data';

const server = setupServer(...handlers);
const user: UserEvent = userEvent.setup();

const setDates = async (start: Date, end: Date) => {
  const startDateInput = screen.getByTestId(
    testIds.announcements.announcementForm.startDateInput
  );
  const endDateInput = screen.getByTestId(
    testIds.announcements.announcementForm.endDateInput
  );
  await user.click(startDateInput);
  await user.click(screen.getAllByTitle(start.toISOString().slice(0, 10))[0]);
  await user.click(screen.getAllByText('OK')[0]);

  await user.click(endDateInput);
  await user.click(screen.getAllByTitle(end.toISOString().slice(0, 10))[1]);
  await user.click(screen.getAllByText('OK')[1]);
};

const updateFormFields = async (title, description, startDate, endDate) => {
  const titleInput = screen.getByTestId(
    testIds.announcements.announcementForm.titleInput
  );
  const descriptionInput = screen.getByTestId(
    testIds.announcements.announcementForm.descriptionInput
  );

  fireEvent.change(titleInput, { target: { value: title } });

  fireEvent.change(descriptionInput, {
    target: {
      value: description,
    },
  });

  await setDates(startDate, endDate);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Announcement Settings', () => {
  it('should not render list when it is empty', async () => {
    server.use(
      rest.get(`/api${paths.ANNOUNCEMENTS_LIST}`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ content: [] }))
      )
    );
    act(() => {
      render(<AnnouncementsSettings />);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please click on the button bellow to start creating the announcements.'
        )
      ).toBeInTheDocument();
    });
    const addEmptyButton = screen.getByTestId(
      testIds.announcements.addButtonEmpty
    );
    expect(addEmptyButton).toBeInTheDocument();

    fireEvent.click(addEmptyButton);

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });
  });

  it('should update announcement and replace it in list on form submit', async () => {
    act(() => {
      render(<AnnouncementsSettings />);
    });
    await waitFor(() => {
      expect(screen.getByText('Annoucements')).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIds.announcements.Spinner)
    );

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() + 1);
    endDate.setDate(currentDate.getDate() + 2);

    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);

    const editButton = screen.getByTestId(
      testIds.announcements.announcementItem.edit
    );

    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });

    await updateFormFields(
      'Closing Keynote',
      'Test this is a vlid long announcement for testing',
      startDate,
      endDate
    );

    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIds.announcements.announcementForm.container)
    );

    await waitFor(async () => {
      expect(
        screen.getAllByTestId(testIds.announcements.announcementItem.container)
          .length
      ).toBe(1);
      expect(
        screen.queryByText(ANNCOUNCEMENT_LIST[0].title)
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Closing Keynote')).toBeInTheDocument();
      expect(
        screen.queryByText(ANNCOUNCEMENT_LIST[0].description)
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText('Test this is a vlid long announcement for testing')
      ).toBeInTheDocument();
    });
  });

  it('should add announcement to list on form submit', async () => {
    act(() => {
      render(<AnnouncementsSettings />);
    });
    await waitFor(() => {
      expect(screen.getByText('Annoucements')).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIds.announcements.Spinner)
    );

    const addButton = screen.getByTestId(testIds.announcements.addButton);

    await act(async () => {
      await user.click(addButton);
    });
    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.announcements.announcementForm.container)
      ).toBeInTheDocument();
    });

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

    await updateFormFields(
      'Closing Keynote',
      'Test this is a vlid long announcement for testing',
      startDate,
      endDate
    );

    const submitButton = screen.getByTestId(
      testIds.announcements.announcementForm.submitButton
    );

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIds.announcements.announcementForm.container)
    );

    await waitFor(async () => {
      await waitForElementToBeRemoved(() =>
        screen.queryByTestId(testIds.announcements.Spinner)
      );

      expect(
        screen.getAllByTestId(testIds.announcements.announcementItem.container)
          .length
      ).toBe(2);
    });
  });

  it('should delete announcement and remove it from the list ', async () => {
    act(() => {
      render(<AnnouncementsSettings />);
    });
    await waitFor(() => {
      expect(screen.getByText('Annoucements')).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIds.announcements.Spinner)
    );

    const dropDownButton = screen.getAllByTestId(
      testIds.announcements.announcementItem.dots
    )[0];

    fireEvent.click(dropDownButton);

    const deleteButton = screen.getByTestId(
      testIds.announcements.announcementItem.delete
    );

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByTestId(
          testIds.announcements.deleteAnnouncementModal.container
        )
      ).toBeInTheDocument();
    });

    const confirmButton = screen.getByTestId(
      testIds.announcements.deleteAnnouncementModal.confirmButton
    );

    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(async () => {
      expect(
        screen.queryAllByTestId(
          testIds.announcements.announcementItem.container
        ).length
      ).toBe(1);
    });
  });
});
