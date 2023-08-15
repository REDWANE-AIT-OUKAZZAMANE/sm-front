export const ADMIN_DATA = {
  content: [
    {
      id: '64660020342fd96df0b30fb1',
      firstName: 'Mariam',
      lastName: 'How',
      email: 'mariam@smwall.dev',
      activated: false,
      authorities: [
        {
          id: '6466001f342fd96df0b30faf',
          name: 'ROLE_MODERATOR',
        },
      ],
      createdAt: '2023-05-18T10:38:24.866Z',
      lastModifiedAt: '2023-08-10T02:16:01.542Z',
    },
    {
      id: '64d12d310b6e8b7715709eff',
      firstName: 'rredddd',
      lastName: 'smitoo',
      email: 'devs@smwall.dev',
      activated: true,
      authorities: [
        {
          id: '6466001f342fd96df0b30fae',
          name: 'ROLE_MODERATOR',
        },
      ],
      createdAt: '2023-05-18T10:38:24.861Z',
      lastModifiedAt: '2023-08-09T16:59:25.601Z',
    },
    {
      id: '64d3ef22b9f5dc1699d0f4f4',
      firstName: 'ayoub',
      lastName: 'ok',
      email: 'ayoubok@gmail.com',
      activated: true,
      authorities: [null],
      createdAt: '2023-08-09T19:55:14.586Z',
      lastModifiedAt: '2023-08-09T19:55:14.586Z',
    },
    {
      id: '64d3f4a86c8be52f205f702a',
      firstName: 'john',
      lastName: 'doeeeeeeee',
      email: 'john@do.com',
      activated: true,
      authorities: [
        {
          id: '6466001f342fd96df0b30faf',
          name: 'ROLE_MODERATOR',
        },
      ],
      createdAt: '2023-08-09T20:18:48.376Z',
      lastModifiedAt: '2023-08-09T22:11:03.320Z',
    },
    {
      id: '64d40da76c8be52f205f702d',
      firstName: 'New',
      lastName: 'Admin',
      email: 'new@admin.com',
      activated: true,
      authorities: [
        {
          id: '6466001f342fd96df0b30fae',
          name: 'ROLE_MODERATOR',
        },
      ],
      createdAt: '2023-08-09T22:05:27.052Z',
      lastModifiedAt: '2023-08-09T22:05:27.052Z',
    },
  ],
  pageable: {
    sort: [],
    offset: 0,
    pageSize: 20,
    pageNumber: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalElements: 5,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: [],
  first: true,
  numberOfElements: 5,
  empty: false,
};

export const ADMIN_RESPONSE = {
  id: '64d62300f0876a3938a8b1ae',
  firstName: 'Sa3id',
  lastName: 'Doe',
  email: 'saiid@doe.com',
  activated: true,
  authorities: [
    {
      id: '6466001f342fd96df0b30fae',
      name: 'ROLE_ADMIN',
    },
  ],
  createdAt: '2023-08-11T12:01:04.303320700Z',
  lastModifiedAt: '2023-08-11T12:01:04.303320700Z',
};

export const AUTHORITIES = [
  {
    id: '6466001f342fd96df0b30faf',
    name: 'ROLE_MODERATOR',
  },
  {
    id: '6466001f342fd96df0b30fae',
    name: 'ROLE_ADMIN',
  },
];
