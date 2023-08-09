import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { testIds } from '../../../../constants';
import AdminsFilter from '../../../../../app/backoffice/pages/Settings/AdminManagement/FilterForm';

function renderWithRouter(ui: React.ReactElement) {
  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  return render(ui, { wrapper: Wrapper });
}
beforeEach(() => {
  // @ts-ignore
  renderWithRouter(<AdminsFilter />);
});
const user = userEvent.setup();
describe('Filter Form', () => {
  it('should render the AdminsFilter component', () => {
    const filterForm = screen.getByTestId(testIds.users.FilterForm.container);
    expect(filterForm).toBeInTheDocument();
  });

  it('should update form fields and submit the form', () => {
    waitFor(
      async () => {
        const searchInput = screen.getByTestId(
          testIds.users.FilterForm.searchInput
        );
        const roleSelect = screen.getAllByRole('combobox')[0];
        const submitButton = screen.getByTestId(
          testIds.users.FilterForm.submitButton
        );
        await act(async () => {
          fireEvent.change(searchInput, { target: { value: 'example query' } });

          await user.click(roleSelect);
          await waitFor(() => screen.getByText('Admin'));

          await user.click(screen.getByText('Admin'));

          fireEvent.click(submitButton);
        });
        waitFor(() => {
          const currentUrl = window.location.href;
          expect(currentUrl).toContain('q=example%20query');
          expect(currentUrl).toContain('authorities.eq=ROLE_ADMIN');
        });
      },
      { timeout: 8000 }
    );
  });

  it('should reset form fields', () => {
    waitFor(async () => {
      const searchInput = screen.getByTestId(
        testIds.users.FilterForm.searchInput
      );
      const roleSelect = screen.getAllByRole('combobox')[0];
      const resetButton = screen.getByTestId(
        testIds.users.FilterForm.resetButton
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'example query' } });

        await user.click(roleSelect);
        await waitFor(() => screen.getByText('Admin'));

        await user.click(screen.getByText('Admin'));

        fireEvent.click(resetButton);
      });

      waitFor(() => {
        expect(searchInput).toHaveValue('');
        expect(roleSelect).toHaveValue('');
      });
    });
  });
});
