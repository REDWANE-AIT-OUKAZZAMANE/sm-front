import { Dropdown, MenuProps } from 'antd';
import dayjs from 'dayjs';

import { Announcement } from '../../../../../types';
import dots from '../../../../../../assets/icons/vertical_dots.svg';
import { ReactComponent as Pen } from '../../../../../../assets/icons/pen.svg';
import { ReactComponent as Bin } from '../../../../../../assets/icons/bin.svg';
import './style.scss';

type AnnouncementItemProps = {
  announcement: Announcement;
};

const items: MenuProps['items'] = [
  {
    label: (
      <button type="button" className="flex items-center mb-2">
        <span className="mr-4">
          <Pen className="icon" />
        </span>{' '}
        Edit announcement
      </button>
    ),
    key: '0',
  },
  {
    label: (
      <button type="button" className="flex items-center mt-2">
        <span className="mr-4">
          <Bin className="icon" />
        </span>{' '}
        Delete announcement
      </button>
    ),
    key: '1',
  },
];

function AnnounecementItem({ announcement }: AnnouncementItemProps) {
  const { title, description, startDate, endDate } = announcement;

  return (
    <div className="border-[#E2E2E2] rounded-2xl border p-[20px]">
      <div className="flex gap-10">
        <div className="max-w-[126px]">
          <h1 className="whitespace-nowrap text-[color:var(--border-grey)] font-bold text-lg mb-2">
            ANNOUNCMENT TITLE
          </h1>
          <p className="text-xl text-black font-medium">{title}</p>
        </div>
        <div className="flex-1">
          <h1 className="whitespace-nowrap text-[color:var(--border-grey)] font-bold text-lg mb-2">
            ANNOUNCMENT DESCRIPTION
          </h1>
          <p className="text-xl break-all text-black font-medium">
            {description}
          </p>
        </div>
        <div>
          <h1 className="whitespace-nowrap text-[color:var(--border-grey)] font-bold text-lg mb-2">
            START DATE & TIME
          </h1>
          <div>
            <p className=" text-xl text-black font-medium">
              {dayjs(startDate).format('MMMM D, YYYY')}
            </p>
            <p className=" text-xl text-black font-medium">
              {dayjs(startDate).format('h:mm A')}
            </p>
          </div>
        </div>
        <div>
          <h1 className="whitespace-nowrap text-[color:var(--border-grey)] font-bold text-lg mb-2">
            END DATE & TIME
          </h1>
          <div>
            <p className="text-xl text-black font-medium">
              {dayjs(endDate).format('MMMM D, YYYY')}
            </p>
            <p className="text-xl text-black font-medium">
              {dayjs(endDate).format('h:mm A')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Dropdown menu={{ items }} trigger={['click']}>
            <button className="px-[10px] h-[20px]" type="button">
              <img src={dots} alt="fots" />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AnnounecementItem;
