import { rest } from 'msw';

import { WALL_SETTINGS_WITHOUT_ID } from './pages/backoffice/GeneraleSettings/WallSettings/data';
import paths from '../api/paths';
import {
  AnnouncementAddCommand,
  AnnouncementUpdateCommand,
} from '../app/backoffice/data/api';
import { CurrentAnnouncement } from './pages/landing/AnnouncementOrPost/data';
import { Announcement } from '../app/types';
import { ANNCOUNCEMENT_LIST } from './pages/backoffice/GeneraleSettings/AnnouncementSettings/data';

let addedAnnouncement: Announcement | null = null;
let deletedId = '';
let updatedAnnouncement: Announcement | null = null;
let announcementList: Announcement[] = ANNCOUNCEMENT_LIST;
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
  rest.post(`/api${paths.ANNOUNCEMENTS_LIST}`, (req, res, ctx) => {
    const announcementCommand = req.body as AnnouncementAddCommand;

    addedAnnouncement = {
      id: new Date().toISOString(),
      title: announcementCommand.title,
      description: announcementCommand.description,
      startDate: new Date(announcementCommand.startDate),
      endDate: new Date(announcementCommand.endDate),
    };
    return res(ctx.status(200), ctx.json(addedAnnouncement));
  }),
  rest.patch(`/api${paths.ANNOUNCEMENT_UPDATE(':id')}`, (req, res, ctx) => {
    const announcementCommand = req.body as AnnouncementUpdateCommand;
    updatedAnnouncement = {
      id: req.params.id,
      title: announcementCommand.title,
      description: announcementCommand.description,
      startDate: new Date(announcementCommand.startDate),
      endDate: new Date(announcementCommand.endDate),
    };
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        title: announcementCommand.title,
        description: announcementCommand.description,
        startDate: announcementCommand.startDate,
        endDate: announcementCommand.endDate,
      })
    );
  }),
  rest.get('/api/v1/announcements', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        content: [CurrentAnnouncement],
      })
    )
  ),
  rest.delete(`/api${paths.DELETE_ANNOUNCEMENT(':id')}`, (req, res, ctx) => {
    deletedId = req.params.id;
    return res(ctx.status(200));
  }),
  rest.get(`/api${paths.ANNOUNCEMENTS_LIST}`, (req, res, ctx) => {
    announcementList = addedAnnouncement
      ? [...announcementList, addedAnnouncement]
      : announcementList;
    addedAnnouncement = null;
    announcementList = announcementList.filter((an) => an.id !== deletedId);

    announcementList = announcementList.map((ann) => {
      if (updatedAnnouncement && ann.id === updatedAnnouncement.id)
        return updatedAnnouncement;
      return ann;
    });
    return res(ctx.status(200), ctx.json({ content: announcementList }));
  }),
];
