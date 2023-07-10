import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Sidemenu from '../../../../app/backoffice/layout/Sidemenu';
import { testIds } from '../../../constants';
import { NavItems } from '../../../../app/backoffice/layout/Sidemenu/nav-settings';

function renderWithRouter(ui: React.ReactElement) {
  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  return render(ui, { wrapper: Wrapper });
}
describe('Sidemenu', () => {
  it('renders the logo and user data', () => {
    const userData = {
      data: {
        email: 'example@example.com',
      },
    };
    renderWithRouter(<Sidemenu userData={userData} />);

    const logoElement = screen.getByTestId(testIds.sidemenu.logo);
    expect(logoElement).toBeInTheDocument();

    const emailElement = screen.getByTestId(testIds.sidemenu.userEmail);

    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(userData.data.email);
  });

  it('renders the navigation items and subitems', () => {
    renderWithRouter(<Sidemenu userData={null} />);

    const navigationButtons = screen.getAllByTestId(
      testIds.sidemenu.menuButton
    );
    expect(navigationButtons.length).toBe(NavItems.length);

    NavItems.forEach((navItem, index) => {
      const navigationButton = navigationButtons[index];
      expect(navigationButton).toHaveTextContent(navItem.name);

      if (navItem.subItems) {
        fireEvent.click(navigationButton);

        navItem.subItems.forEach((subItem) => {
          const subItemButton = screen.getByText(subItem.name);
          expect(subItemButton).toBeInTheDocument();
        });
      }
    });
  });
  it('navigates to the correct route on click', () => {
    renderWithRouter(<Sidemenu userData={null} />);
    const navigationButtons = screen.getAllByTestId(
      testIds.sidemenu.menuButton
    );

    NavItems.forEach((navItem, index) => {
      const navigationButton = navigationButtons[index];

      fireEvent.click(navigationButton);
      if (navItem.subItems) {
        navItem.subItems.forEach((subItem) => {
          const subItemButton = screen.getByText(subItem.name);
          fireEvent.click(subItemButton);
          const url = window.location.href;
          expect(url.substring(url.lastIndexOf('/') + 1)).toBe(
            subItem.link.split('/')[1]
          );
        });
      } else {
        const url = window.location.href;
        expect(url.substring(url.lastIndexOf('/') + 1)).toBe(navItem.link);
      }
    });
  });
});
