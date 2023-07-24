const currentDate = new Date();
const endDate = new Date();
endDate.setDate(currentDate.getDate() + 1);
export const CurrentAnnouncement = {
  id: 'a',
  title: 'closing keynote',
  description: 'this a lon valid description test for frontoffice announcement',
  startDate: currentDate,
  endDate,
  deleted: false,
};
