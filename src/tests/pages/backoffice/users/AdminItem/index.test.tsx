import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';

import { ADMIN } from './data';
import AdminItem from '../../../../../app/backoffice/pages/Settings/AdminManagement/AdminItem';
import { testIds } from '../../../../constants';

beforeEach(() => {
  render(<AdminItem admin={ADMIN} />);
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
});
