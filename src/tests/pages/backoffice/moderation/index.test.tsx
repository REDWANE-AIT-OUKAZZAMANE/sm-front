import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PostsFilter from '../../../../app/backoffice/pages/Moderation/FilterForm';
// import Moderation from '../../../../app/backoffice/pages/Moderation';

function renderWithRouter(ui: React.ReactElement) {
  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  return render(ui, { wrapper: Wrapper });
}

describe('Moderation', () => {
  it('does something', () => {
    renderWithRouter(<PostsFilter />);

    // use only for debugging, remove when done
    screen.debug();
  });
});
