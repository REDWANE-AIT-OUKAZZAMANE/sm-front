import WallSettings from './WallSettings';
import AnnouncementsSettings from './AnnouncementsSettings';

export default function GeneralSettings() {
  return (
    <div className="flex flex-col gap-[10px] mx-[32px] mb-[17px] h-full">
      <WallSettings />
      <AnnouncementsSettings />
    </div>
  );
}
