import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Layout from '../../../../app/backoffice/layout';
import { testIds } from '../../../constants';

const mockUserData = {
  id: '0',
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@gmail.com',
  activated: true,
  createdAt: '',
  lastModifiedAt: '',
};

describe('layout component', () => {
  it('renders sidebar, header, and content components', () => {
    render(
      <BrowserRouter>
        <Layout userData={mockUserData} />
      </BrowserRouter>
    );

    const sidebar = screen.getByTestId(testIds.sidemenu.container);
    expect(sidebar).toBeInTheDocument();

    const header = screen.getByTestId(testIds.header);
    expect(header).toBeInTheDocument();

    const content = screen.getByTestId(testIds.content);
    expect(content).toBeInTheDocument();
  });
});
