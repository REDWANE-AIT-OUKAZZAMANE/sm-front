import dashIcon from '../../../../assets/icons/Dashboard.svg';
import folderIcon from '../../../../assets/icons/Content.svg';
import { AUTHORITIES } from '../../../utils/constants';
// import feedIcon from '../../../../assets/icons/feed.svg';
// import statsIcon from '../../../../assets/icons/stats.svg';

export const NavItems = [
  {
    name: 'Moderation',
    icon: dashIcon,
    link: 'moderate',
    allowedRoles: [AUTHORITIES.ADMIN, AUTHORITIES.MODERATOR],
  },
  // {
  //   name: 'Content',
  //   icon: feedIcon,
  //   subItems: [
  //     {
  //       name: 'Social Media',
  //       link: 'content/social-media',
  //     },
  //     {
  //       name: 'Annoucement',
  //       link: 'content/annoucement',
  //     },
  //     {
  //       name: 'Sponsors',
  //       link: 'content/sponsors',
  //     },
  //   ],
  //   link: 'content',
  // },
  // {
  //   name: 'Statistics',
  //   icon: statsIcon,
  //   link: 'stats',
  // },
  {
    name: 'Settings',
    icon: folderIcon,
    allowedRoles: [AUTHORITIES.ADMIN],
    subItems: [
      {
        name: 'General settings',
        link: 'settings/general-settings',
      },
      {
        name: 'Admin Management',
        link: 'settings/admin-management',
      },
    ],
    link: 'settings',
  },
];
