import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import PostsFilter from '../../../../../app/backoffice/pages/Moderation/FilterForm';
import { testIds } from '../../../../constants';

function renderWithRouter(ui: React.ReactElement) {
  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  return render(ui, { wrapper: Wrapper });
}
beforeEach(() => {
  renderWithRouter(<PostsFilter />);
});
const user = userEvent.setup();
describe('Filter Form', () => {
  it('should render the PostsFilter component', () => {
    const filterForm = screen.getByTestId(testIds.moderation.postsFilter);
    expect(filterForm).toBeInTheDocument();
  });

  it('should update form fields and submit the form', () => {
    waitFor(
      async () => {
        const searchInput = screen.getByTestId(
          testIds.moderation.FilterForm.searchInput
        );
        const sourceSelect = screen.getAllByRole('combobox')[0];
        const visibilitySelect = screen.getAllByRole('combobox')[1];
        const submitButton = screen.getByTestId(
          testIds.moderation.FilterForm.submitButton
        );
        await act(async () => {
          fireEvent.change(searchInput, { target: { value: 'example query' } });

          await user.click(sourceSelect);
          await waitFor(() => screen.getByText('Instagram feeds'));

          await user.click(screen.getByText('Instagram feeds'));
          await user.click(visibilitySelect);
          await waitFor(() => screen.getByText('Visible post'));

          await user.click(screen.getByText('Visible post'));

          fireEvent.click(submitButton);
        });
        waitFor(() => {
          const currentUrl = window.location.href;

          expect(currentUrl).toContain('q=example%20query');
          expect(currentUrl).toContain('source.eq=INSTAGRAM');
          expect(currentUrl).toContain('hidden.eq=true');
        });
      },
      { timeout: 8000 }
    );
  });

  it('should reset form fields', () => {
    waitFor(async () => {
      const searchInput = screen.getByTestId(
        testIds.moderation.FilterForm.searchInput
      );
      const sourceSelect = screen.getAllByRole('combobox')[0];
      const visibilitySelect = screen.getAllByRole('combobox')[1];
      const resetButton = screen.getByTestId(
        testIds.moderation.FilterForm.resetButton
      );
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'example query' } });

        await user.click(sourceSelect);
        await waitFor(() => screen.getByText('youtube feeds'));

        await user.click(screen.getByText('youtube feeds'));
        await user.click(visibilitySelect);
        await waitFor(() => screen.getByText('Hidden post'));

        await user.click(screen.getByText('Hidden post'));

        fireEvent.click(resetButton);
      });

      waitFor(() => {
        expect(searchInput).toHaveValue('');
        expect(sourceSelect).toHaveValue('');
        expect(visibilitySelect).toHaveValue('');
      });
    });
  });
});
