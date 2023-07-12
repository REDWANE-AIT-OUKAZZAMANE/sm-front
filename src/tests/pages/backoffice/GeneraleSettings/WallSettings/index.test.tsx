import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { notification } from 'antd';

import WallSettings from '../../../../../app/backoffice/pages/Settings/GeneralSettings/WallSettings';
import { testIds } from '../../../../constants';
import paths from '../../../../../api/paths';
import { handlers } from '../../../../server-handlers';
import { WALL_SETTINGS_WITHOUT_ID } from './data';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Wall Settings', () => {
  it('renders title, inputs, and button', async () => {
    render(<WallSettings />);
    await waitFor(() => {
      const titleElement = screen.getByTestId(testIds.wallSettings.titleInput);
      expect(titleElement).toBeInTheDocument();

      const logoInputElement = screen.getByTestId(
        testIds.wallSettings.fileInput
      );
      expect(logoInputElement).toBeInTheDocument();

      const submitButton = screen.getByTestId(
        testIds.wallSettings.submitButton
      );
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('displays error message for short title', async () => {
    render(<WallSettings />);
    await waitFor(async () => {
      const titleInput = screen.getByTestId(testIds.wallSettings.titleInput);
      fireEvent.change(titleInput, { target: { value: 'abc' } });

      const errorMessage = screen.getByText(
        'Title must contain at least 5 characters'
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('displays error message for invalid file (wrong file format)', async () => {
    render(<WallSettings />);
    await waitFor(async () => {
      // Find the input field
      const uploadWrapper = screen.getByTestId(
        testIds.wallSettings.uploadWrapper
      );

      const file = new File(['file content'], 'logo.png', {
        type: 'image/gif',
      });

      await userEvent.upload(uploadWrapper, file);

      const errorMessage = screen.getByRole('alert').firstChild?.textContent;

      expect(errorMessage).toMatchInlineSnapshot(
        '"You can only upload PNG, SVG, JPEG files!"'
      );
    });
  });

  it('updates the file input value when a file is uploaded', async () => {
    render(<WallSettings />);
    await waitFor(() => {
      const uploadWrapper = screen.getByTestId(
        testIds.wallSettings.uploadWrapper
      );

      const file = new File(['file content'], 'logo321.png', {
        type: 'image/png',
      });

      userEvent.upload(uploadWrapper, file);

      const fileInput = screen.getByTestId(testIds.wallSettings.fileInput);
      expect(fileInput).toHaveValue('logo321.png');
    });
  });

  it('shows wall settings info after fetch', async () => {
    render(<WallSettings />);
    await waitFor(() => {
      // Assert that the file input value has been updated
      const titleInput = screen.getByTestId(testIds.wallSettings.titleInput);
      const fileInput = screen.getByTestId(testIds.wallSettings.fileInput);
      expect(titleInput).toHaveValue(WALL_SETTINGS_WITHOUT_ID.title);
      expect(fileInput).toHaveValue(WALL_SETTINGS_WITHOUT_ID.filename);
    });
  });

  it('on adding should enable button, show success notification, and update input values on form submission with valid data', async () => {
    render(<WallSettings />);

    await waitFor(() => {
      expect(screen.getByTestId(testIds.wallSettings.titleInput)).toHaveValue(
        'wall settings title'
      );
    });

    // Fill in valid data in the input fields
    const titleInput = screen.getByTestId(testIds.wallSettings.titleInput);
    const uploadWrapper = screen.getByTestId(
      testIds.wallSettings.uploadWrapper
    );

    await act(() => {
      fireEvent.change(titleInput, { target: { value: 'Valid Title' } });

      const file = new File(['file content'], 'logo.png', {
        type: 'image/png',
      });

      userEvent.upload(uploadWrapper, file);
    });

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    const saveButton = screen.getByTestId(testIds.wallSettings.submitButton);
    expect(saveButton).toBeEnabled();
    await fireEvent.click(saveButton);

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: 'Success',
        description: 'The wall setting has been successfully added',
        placement: 'bottomRight',
        icon: expect.any(Object),
      });

      expect(screen.getByTestId(testIds.wallSettings.titleInput)).toHaveValue(
        'Valid Title'
      );
      expect(screen.getByTestId(testIds.wallSettings.fileInput)).toHaveValue(
        'logo.png'
      );
    });
  });

  it('on update should enable button, show success notification, and update input values on form submission with valid data', async () => {
    const wallSettingsWithId = {
      ...WALL_SETTINGS_WITHOUT_ID,
      id: 'abc',
    };

    server.use(
      rest.get(`/api${paths.WALL_SETTINGS_LATEST}`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(wallSettingsWithId))
      )
    );

    render(<WallSettings />);
    await waitFor(() => {
      expect(screen.getByTestId(testIds.wallSettings.titleInput)).toHaveValue(
        'wall settings title'
      );
    });

    await act(() => {
      // Fill in valid data in the input fields
      const titleInput = screen.getByTestId(testIds.wallSettings.titleInput);
      const uploadWrapper = screen.getByTestId(
        testIds.wallSettings.uploadWrapper
      );

      fireEvent.change(titleInput, {
        target: { value: 'Valid Title Updated' },
      });

      // Create a mock File object
      const file = new File(['file content'], 'logoUpdated.png', {
        type: 'image/png',
      });

      // Simulate file selection by triggering the onChange event on the wrapper element
      userEvent.upload(uploadWrapper, file);
    });

    const notificationOpenSpy = vi.spyOn(notification, 'open');

    const saveButton = screen.getByTestId(testIds.wallSettings.submitButton);
    expect(saveButton).toBeEnabled();
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        message: 'Success',
        description: 'The wall setting has been successfully updated',
        placement: 'bottomRight',
        icon: expect.any(Object),
      });

      expect(screen.getByTestId(testIds.wallSettings.titleInput)).toHaveValue(
        'Valid Title Updated'
      );
      expect(screen.getByTestId(testIds.wallSettings.fileInput)).toHaveValue(
        'logoUpdated.png'
      );
    });
  });
});
