import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '../../../../app/landing/components/Header';
import WallSettings from '../../../../app/backoffice/pages/Settings/GeneralSettings/WallSettings';
import { WallSettings as WallSettingsT } from '../../../../app/types';
import paths from '../../../../api/paths';
import { WALL_SETTINGS_WITHOUT_ID } from '../../backoffice/GeneraleSettings/WallSettings/data';
import { testIds } from '../../../constants';
import { ADDED_WALL_SETTINGS } from './data';

let addedWallSettings: WallSettingsT | null = null;

const server = setupServer(
  rest.get(`/api${paths.WALL_SETTINGS_LATEST}`, (req, res, ctx) => {
    const latestWallSettinsg = addedWallSettings || {
      ...WALL_SETTINGS_WITHOUT_ID,
      id: '1',
    };
    addedWallSettings = null;
    return res(ctx.status(200), ctx.json(latestWallSettinsg));
  }),
  rest.patch(`/api${paths.WALL_SETTINGS_UPDATE(':id')}`, (req, res, ctx) => {
    const formData = req.body as FormData;

    const title = formData.get('title');
    const logo: File = formData.get('logo') as File;

    addedWallSettings = {
      id: 'abc',
      title: title as string,
      logoBase64: ADDED_WALL_SETTINGS.logoBase64,
      filename: logo && logo.name,
    };
    return res(ctx.status(200), ctx.json(addedWallSettings));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Wall Settings', () => {
  it('shows updated wall settings in front office header', async () => {
    const { unmount } = render(
      <>
        <WallSettings />
        <Header />
      </>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(testIds.frontoffice.header.loader)
    );
    await waitFor(() => {
      const headerImg = screen.getByTestId(testIds.frontoffice.header.img);
      expect(headerImg).toBeInTheDocument();
      expect(headerImg.getAttribute('src')).toBe(
        WALL_SETTINGS_WITHOUT_ID.logoBase64
      );

      const headerTitle = screen.getByTestId(testIds.frontoffice.header.title);
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle.textContent).toBe(WALL_SETTINGS_WITHOUT_ID.title);
    });

    const titleInput = screen.getByTestId(testIds.wallSettings.titleInput);
    const uploadWrapper = screen.getByTestId(
      testIds.wallSettings.uploadWrapper
    );

    fireEvent.change(titleInput, {
      target: { value: ADDED_WALL_SETTINGS.title },
    });

    const file = new File(['file content'], ADDED_WALL_SETTINGS.filename, {
      type: 'image/png',
    });

    await userEvent.upload(uploadWrapper, file);

    const saveButton = screen.getByTestId(testIds.wallSettings.submitButton);
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    await waitFor(async () => unmount());

    render(<Header />);

    await waitFor(async () => {
      const headerTitle = screen.getByTestId(testIds.frontoffice.header.title);
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle.textContent).toBe(ADDED_WALL_SETTINGS.title);

      const headerImg = screen.getByTestId(testIds.frontoffice.header.img);
      expect(headerImg).toBeInTheDocument();
      expect(headerImg.getAttribute('src')).toBe(
        ADDED_WALL_SETTINGS.logoBase64
      );
    });
  });
});
