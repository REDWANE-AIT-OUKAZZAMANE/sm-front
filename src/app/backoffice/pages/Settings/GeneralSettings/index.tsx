import WallSettings from './WallSettings';
import AnnouncementsSettings from './AnnouncementsSettings';

export default function GeneralSettings() {
  return (
    <div className="mx-[32px] mb-[17px] flex h-full flex-col gap-[10px]">
      <WallSettings />
      <AnnouncementsSettings />
    </div>
  );
}
