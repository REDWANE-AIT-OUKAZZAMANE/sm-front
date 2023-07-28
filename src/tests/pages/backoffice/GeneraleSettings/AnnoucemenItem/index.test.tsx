import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { notification } from 'antd';
import { setupServer } from 'msw/node';

import AnnouncementItem from '../../../../../app/backoffice/pages/Settings/GeneralSettings/AnnoucemenItem';
import { testIds } from '../../../../constants';
import { ANNOUNCEMENT_ITEM } from './data';
import { handlers } from '../../../../server-handlers';

const server = setupServer(...handlers);
const runGetannouncement = vi.fn();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
beforeEach(() => {
  render(
    <AnnouncementItem
      announcement={ANNOUNCEMENT_ITEM}
      runGetAnnouncemnets={runGetannouncement}
      setLoading={vi.fn()}
      editedAnnouncementId=""
      setEditedAnnouncementId={vi.fn()}
      announcementFormVisible={false}
    />
  );
});
describe('AnnouncementItem', () => {
  it('should render announcement details correctly', () => {
    expect(screen.getByText(ANNOUNCEMENT_ITEM.title)).toBeInTheDocument();
    expect(screen.getByText(ANNOUNCEMENT_ITEM.description)).toBeInTheDocument();
    expect(screen.getByText('START DATE & TIME')).toBeInTheDocument();
    expect(screen.getByText('END DATE & TIME')).toBeInTheDocument();
  });

  it('should open dropdown menu and trigger deleteModal', () => {
    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);

    const deleteButton = screen.getByTestId(
      testIds.announcements.announcementItem.delete
    );

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.getByTestId(testIds.modalContainer)).toBeInTheDocument();
  });

  it('should open dropdown menu and trigger AnnouncementForm', () => {
    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);

    const editButton = screen.getByTestId(
      testIds.announcements.announcementItem.edit
    );

    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(
      screen.getByTestId(testIds.announcements.announcementForm.container)
    ).toBeInTheDocument();
  });

  it('should close dropdown on outside click', () => {
    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);

    const editButton = screen.getByTestId(
      testIds.announcements.announcementItem.edit
    );

    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(
      screen.queryByTestId(testIds.announcements.announcementItem.edit)
    ).not.toBeInTheDocument();
  });

  it('should delete announcement and call runGetAnnouncement', async () => {
    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);
    const deleteButton = screen.getByTestId(
      testIds.announcements.announcementItem.delete
    );

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
        description: 'The announcement has been successfully deleted',
        placement: 'bottomRight',
        icon: expect.any(Object),
      });
      expect(runGetannouncement).toHaveBeenCalled();
    });
  });
});
