import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Header from '../../../../app/landing/components/Header';
import Footer from '../../../../app/landing/components/Footer';
import { testIds } from '../../../constants';
import { FOOTER_DATA, HEADER_DATA } from './data';

const restMediadataHandler = [
  rest.get(
    'http://localhost:3000/api/v1/wall/settings/latest',
    (req, res, ctx) => res(ctx.status(200), ctx.json(HEADER_DATA))
  ),

  rest.get('http://localhost:3000/api/v1/footer', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(FOOTER_DATA))
  ),
];

const server = setupServer(...restMediadataHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('frontoffice header and footer', () => {
  it('displays header with correct components and data', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.frontoffice.header.loader)
    );

    const headerImg = screen.getByTestId(testIds.frontoffice.header.img);
    expect(headerImg).toBeInTheDocument();
    expect(headerImg.getAttribute('src')).toBe(HEADER_DATA.logoBase64);

    const headerTitle = screen.getByTestId(testIds.frontoffice.header.title);
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle.textContent).toBe(HEADER_DATA.title);
  });

  it('displays footer with correct components and data', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.frontoffice.footer.loader)
    );

    const footerLogo = screen.getByTestId(testIds.frontoffice.footer.logo);
    expect(footerLogo).toBeInTheDocument();
    expect(footerLogo.getAttribute('src')).toBe(FOOTER_DATA.logoUrl);

    const coOrganizer = screen.getByTestId(
      testIds.frontoffice.footer.coOrganizer
    );
    expect(coOrganizer).toBeInTheDocument();
    expect(coOrganizer.getAttribute('src')).toBe(FOOTER_DATA.coOrganizer);

    const sponsors = screen.getByTestId(testIds.frontoffice.footer.sponsors);
    expect(sponsors).toBeInTheDocument();
    expect(sponsors.children.length).toBe(
      Object.keys(FOOTER_DATA.sponsors).length
    );

    const partners = screen.getByTestId(
      testIds.frontoffice.footer.institutionalPartners
    );
    expect(partners).toBeInTheDocument();
    expect(partners.children.length).toBe(
      FOOTER_DATA.institutionalPartners.length
    );
  });
});
