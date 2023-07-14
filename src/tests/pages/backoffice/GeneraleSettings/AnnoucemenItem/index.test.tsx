import { render, screen, fireEvent } from '@testing-library/react';

import AnnouncementItem from '../../../../../app/backoffice/pages/Settings/GeneralSettings/AnnoucemenItem';
import { testIds } from '../../../../constants';
import { ANNOUNCEMENT_ITEM } from './data';

describe('AnnouncementItem', () => {
  it('should render announcement details correctly', () => {
    render(
      <AnnouncementItem
        announcement={ANNOUNCEMENT_ITEM}
        runGetAnnouncemnets={vi.fn()}
        setLoading={vi.fn()}
        editedAnnouncementId=""
        setEditedAnnouncementId={vi.fn()}
        announcementFormVisible={false}
      />
    );

    expect(screen.getByText(ANNOUNCEMENT_ITEM.title)).toBeInTheDocument();
    expect(screen.getByText(ANNOUNCEMENT_ITEM.description)).toBeInTheDocument();
    expect(screen.getByText('START DATE & TIME')).toBeInTheDocument();
    expect(screen.getByText('END DATE & TIME')).toBeInTheDocument();
  });

  it('should open dropdown menu and trigger deleteModal', () => {
    render(
      <AnnouncementItem
        announcement={ANNOUNCEMENT_ITEM}
        runGetAnnouncemnets={vi.fn()}
        setLoading={vi.fn()}
        editedAnnouncementId=""
        setEditedAnnouncementId={vi.fn()}
        announcementFormVisible={false}
      />
    );

    const dropDownButton = screen.getByTestId(
      testIds.announcements.announcementItem.dots
    );

    fireEvent.click(dropDownButton);

    const deleteButton = screen.getByTestId(
      testIds.announcements.announcementItem.delete
    );

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(
      screen.getByTestId(
        testIds.announcements.deleteAnnouncementModal.container
      )
    ).toBeInTheDocument();
  });

  it('should open dropdown menu and trigger AnnouncementForm', () => {
    render(
      <AnnouncementItem
        announcement={ANNOUNCEMENT_ITEM}
        runGetAnnouncemnets={vi.fn()}
        setLoading={vi.fn()}
        editedAnnouncementId=""
        setEditedAnnouncementId={vi.fn()}
        announcementFormVisible={false}
      />
    );

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
    render(
      <AnnouncementItem
        announcement={ANNOUNCEMENT_ITEM}
        runGetAnnouncemnets={vi.fn()}
        setLoading={vi.fn()}
        editedAnnouncementId=""
        setEditedAnnouncementId={vi.fn()}
        announcementFormVisible={false}
      />
    );

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
});
