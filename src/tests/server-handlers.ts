import { rest } from 'msw';

import { WALL_SETTINGS_WITHOUT_ID } from './pages/backoffice/GeneraleSettings/WallSettings/data';
import paths from '../api/paths';

export const handlers = [
  rest.get(`/api${paths.WALL_SETTINGS_LATEST}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(WALL_SETTINGS_WITHOUT_ID))
  ),
  rest.post(`/api${paths.WALL_SETTINGS}`, (req, res, ctx) => {
    const formData = req.body as FormData;

    // Get the values from FormData
    const title = formData.get('title');
    const logo: File = formData.get('logo') as File;
    // Assuming successful response with the added wall settings
    return res(
      ctx.status(200),
      ctx.json({
        id: 'abc',
        title,
        logoBase64: 'base64',
        filename: logo.name,
      })
    );
  }),
  rest.patch(`/api${paths.WALL_SETTINGS_UPDATE(':id')}`, (req, res, ctx) => {
    const { id } = req.params;
    const formData = req.body as FormData;

    // Get the values from FormData
    const title = formData.get('title');
    const logo: File = formData.get('logo') as File;

    // Assuming successful response with the updated wall settings
    return res(
      ctx.status(200),
      ctx.json({
        id,
        title,
        logoBase64: 'base64',
        filename: logo && logo.name,
      })
    );
  }),
];
