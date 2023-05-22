import dashIcon from '../../../../assets/icons/Dashboard.svg';
import folderIcon from '../../../../assets/icons/Content.svg';
import feedIcon from '../../../../assets/icons/feed.svg';
import statsIcon from '../../../../assets/icons/stats.svg';

export const NavItems = [
  {
    name: 'Moderate',
    icon: dashIcon,
    link: 'moderate',
  },
  {
    name: 'Content',
    icon: feedIcon,
    subItems: [
      {
        name: 'Social Media',
        link: 'content/social-media',
      },
      {
        name: 'Annoucement',
        link: 'content/annoucement',
      },
      {
        name: 'Sponsors',
        link: 'content/sponsors',
      },
    ],
    link: 'content',
  },
  {
    name: 'Statistics',
    icon: statsIcon,
    link: 'stats',
  },
  {
    name: 'Settings',
    icon: folderIcon,
    subItems: [
      {
        name: 'General settings',
        link: 'settings/general-settings',
      },
      {
        name: 'Role Management',
        link: 'settings/role-management',
      },
    ],
    link: 'settings',
  },
];
